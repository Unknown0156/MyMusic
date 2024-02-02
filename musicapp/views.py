from django.shortcuts import render
from django.http import HttpResponse
from .models import Song


# View of index page
def index(request):
    playlist = []
    for song in Song.objects.all().order_by('order'):
        playlist.append(
            dict(order=song.order, name=song.name, artist=song.artist, audio=song.audio.url, cover=song.cover.url))
    return render(request, "index.html", {"playlist": playlist})

# Healthcheck
def health(request):
    return HttpResponse('ok')