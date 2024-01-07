from django.db import models


# Model for song
class Song(models.Model):
    order = models.IntegerField(unique=True, default=0)
    name = models.CharField(max_length=40)
    artist = models.CharField(max_length=40)
    audio = models.FileField(upload_to='audio')
    cover = models.ImageField(upload_to='images')

    def __str__(self):
        return self.artist.__str__() + ' - ' + self.name.__str__()



