from django.test import TestCase
from musicapp.models import Song


class SongTestCase(TestCase):
    def setUp(self):
        Song.objects.create(order=1, name="test")

    def test_song(self):
        test = Song.objects.get(name="test")
        self.assertEqual(test.name, "test")
