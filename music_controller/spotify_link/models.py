from django.db import models

# Create your models here.

class SpotifyTokens(models.Model):
    session_id = models.CharField(max_length=100)
    user  = models.CharField(max_length=100)
    #user  = models.CharField(max_length=100, unique= True)
    access_token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=100)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=100)
