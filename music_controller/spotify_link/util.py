from .models import SpotifyTokens
from django.utils import timezone
from datetime import timedelta
from .credentials import ClientId, ClientSecret, Redirect_URI
from requests import post, put, get

BASE_URL = 'https://api.spotify.com/v1/me/'

def get_token(session_id):
    user = SpotifyTokens.objects.filter(session_id=session_id)
    if user.exists():
        return user[0]
    return None
def save_tokens(session_id, access_token, token_type, refresh_token, expires_in):
    token = get_token(session_id)
    expires_at = timezone.now() + timedelta(seconds=expires_in)
    if token is None:
        token = SpotifyTokens(session_id=session_id, access_token=access_token, refresh_token=refresh_token, expires_in=expires_at, token_type=token_type)
        token.save()
    else:
        print("duplicate login")
        token.access_token = access_token
        token.refresh_token = refresh_token
        token.expires_in = expires_at
        token.token_type = token_type
        token.save(update_fields = ['access_token', 'refresh_token', 'expires_in'])

def is_authenticated(session_id):
    token = get_token(session_id)
    if token:
        if token.expires_in <= timezone.now():
            refresh_token(session_id)
        return True
    return False

def refresh_token(session_id):
    refresh_token = get_token(session_id).refresh_token
    response = post('https://accounts.spotify.com/api/token', data = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': ClientId,
        'client_secret': ClientSecret
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')
    error = response.get('error')

    save_tokens(session_id, access_token, token_type, refresh_token, expires_in)

def request_spotify_api_call(session_id, endpoint, post_= False, put_= False):
    token = get_token(session_id)
    header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token,
    }

    if post_:
        response = post(BASE_URL + endpoint, headers=header, json=post_)
    elif put_:
        response = put(BASE_URL + endpoint, headers=header, json=put_)
    else:
        response = get(BASE_URL + endpoint,{}, headers=header)
    try: 
        return response.json()
    except:
        return "Issue with API call"

def pause_song(session_id):
    return request_spotify_api_call(session_id, 'player/pause',put_=True)




def play_song(session_id):
    return request_spotify_api_call(session_id, 'player/play', put_=True)


def skip_song(session_id):
    return request_spotify_api_call(session_id, 'player/next',post_=True)