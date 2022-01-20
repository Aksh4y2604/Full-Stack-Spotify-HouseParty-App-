from django.shortcuts import render
import requests
from requests.api import get
from .credentials import ClientId, ClientSecret, Redirect_URI
from rest_framework.views import APIView
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from .util import get_token, save_tokens, is_authenticated, refresh_token, request_spotify_api_call
from django.shortcuts import redirect
from api.models import Room
import json

# Create your views here.

class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing' 
        
        url_params = {
            'client_id': ClientId,
            'response_type': 'code',
            'redirect_uri': Redirect_URI,
            'scope': scopes
}
        url = Request('GET', 'https://accounts.spotify.com/authorize', params = url_params).prepare().url

        return Response({'url': url, 'status': status.HTTP_200_OK})
    
def spotify_callback(request, format = None ):
        print("spotify_callback is running")
        code = request.GET.get('code')#gets the code from the url 
        error = request.GET.get('error')
        if error:
            return Response({'error': error}, status=status.HTTP_400_BAD_REQUEST)
        response = post('https://accounts.spotify.com/api/token', data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': Redirect_URI,
            'client_id': ClientId,
            'client_secret': ClientSecret
        }).json()
        print("Hehe-", response)
        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')
        if not request.session.exists(request.session.session_key):
            request.session.create()
        
        save_tokens(request.session.session_key, access_token, token_type, refresh_token, expires_in)
        
        return redirect('frontend:')

class isAuth(APIView):
    def get(self, request, format= None ):

        
        return Response({'authenticated': is_authenticated(request.session.session_key)}, status=status.HTTP_200_OK)

#current song get requeist 
class CurrentSong(APIView):
    def get(self, request, format=None):
        room_code = request.session.get('room_code')

        room = Room.objects.get(code=room_code)
        if room is not None:
            host = room.host
        else:
            return Response({'error': 'Room does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        endpoint = "player/currently-playing"
        response = request_spotify_api_call(host, endpoint)
        
        
        if 'error' in response or 'item' not in response:
            return Response({},status = status.HTTP_204_NO_CONTENT)
        
        item = response.get('item')
        if item is not None: 

            print(json.dumps(item, indent=4, sort_keys=True))
            duration = item.get('duration_ms')
            progress = response.get('progress_ms')
            album_cover = item.get('album').get('images')[0].get('url')
            is_playing = response.get('is_playing')
            song_id = item.get('id')

            artists_string = ""
            #if there are multiple artists, add them to the string
            for i, artist in enumerate(item.get('artists')):
                if i>0:
                    artists_string+=", "+artist.get('name')     
                else:
                    artists_string+=artist.get('name')

            song = {
                'title': item.get('name'),
                'artists': artists_string,
                'duration': duration,
                'time': progress,
                'image_url': album_cover,
                'is_playing': is_playing,
                'votes': 0,
                'id': song_id
            }

                
            return Response(song, status=status.HTTP_200_OK)
        else:
            return Response({}, status=status.HTTP_204_NO_CONTENT)
            
