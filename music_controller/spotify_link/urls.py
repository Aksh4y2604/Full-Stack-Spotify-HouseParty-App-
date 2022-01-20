from .views import AuthURL, CurrentSong, spotify_callback, isAuth,PlaySong, PauseSong, SkipSong
from django.urls import path
urlpatterns = [
    path('get_auth_url',AuthURL.as_view(),name= 'auth_url'), 
    path('redirectit/',spotify_callback, name='redirect_uri'), 
    # path('redirectit/',spotify_callback, name='redirect_uri/'), 
    path('pause', PauseSong.as_view(), name='pause'),
    path('play', PlaySong.as_view(), name='play'),
    path('skip', SkipSong.as_view(), name='skip'),
    path('isAuth', isAuth.as_view(), name = 'isAuth'), 
    path('current_song', CurrentSong.as_view(), name = 'current_song'),
]
