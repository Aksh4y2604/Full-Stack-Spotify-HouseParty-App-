from django.db import models
from api.models import Room

# Create your models here.

class SpotifyTokens(models.Model):
    session_id = models.CharField(max_length=100)#stores the session_id
    user  = models.CharField(max_length=100)
    #user  = models.CharField(max_length=100, unique= True)
    access_token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=100)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=100)


class Votes(models.Model):
    user = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=100)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    