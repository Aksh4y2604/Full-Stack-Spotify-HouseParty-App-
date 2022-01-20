from .views import AuthURL, CurrentSong, spotify_callback, isAuth
from django.urls import path

urlpatterns = [
    path('get_auth_url',AuthURL.as_view(),name= 'auth_url'), 
    path('redirectit/',spotify_callback, name='redirect_uri'), 
    # path('redirectit/',spotify_callback, name='redirect_uri/'), 
    path('isAuth', isAuth.as_view(), name = 'isAuth'), 
    path('current_song', CurrentSong.as_view(), name = 'current_song'),
]
