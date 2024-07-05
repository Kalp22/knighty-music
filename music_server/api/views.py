# api/views.py
from django.http import JsonResponse
from .ytmusic import search, get_song, get_album, get_streaming_data

def search_view(request):
    query = request.GET.get('query')
    filter = request.GET.get('filter')
    if not query:
        return JsonResponse({'error': 'No query provided'}, status=400)
    if filter:
        results = search(query=query, filter=filter)
    results = search(query=query, filter=None)
    return JsonResponse(results, safe=False)

def song_view(request, song_id):
    result = get_song(song_id)
    return JsonResponse(result, safe=False)

def album_view(request, album_id):
    result = get_album(album_id)
    return JsonResponse(result, safe=False)

def streaming_view(request, video_id):
    result = get_streaming_data(video_id)
    return JsonResponse(result)
