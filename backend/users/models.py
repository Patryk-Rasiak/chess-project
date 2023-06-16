from django.db import models

class Profile(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE, related_name='profile')
    ranking_bullet = models.IntegerField(default=0)
    ranking_blitz = models.IntegerField(default=0)
    ranking_rapid = models.IntegerField(default=0)
    games_played = models.IntegerField(default=0)