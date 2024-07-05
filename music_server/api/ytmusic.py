# api/ytmusic.py
from ytmusicapi import YTMusic

# Initialize YTMusic with the default browser headers
ytmusic = YTMusic()

UNWANTED_TYPES = ["video", "podcast", "episode", "Profiles"]

def search(query, filter=None):
    results = ytmusic.search(query, filter=filter)
    filtered_results = [result for result in results if result['resultType'] not in UNWANTED_TYPES]
    return filtered_results

def get_song(song_id):
    return ytmusic.get_song(song_id)

def get_album(album_id):
    return ytmusic.get_album(album_id)

def get_streaming_data(videoId):
    song_data = ytmusic.get_song(videoId)
    streaming_data = {
        'title': song_data['videoDetails']['title'],
        'streaming_url': f"https://www.youtube.com/watch?v={videoId}"
    }
    return streaming_data
