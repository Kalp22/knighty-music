# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search_view, name='search'),
    path('song/<str:song_id>/', views.song_view, name='song'),
    path('album/<str:album_id>/', views.album_view, name='album'),
    path('stream/<str:video_id>/', views.streaming_view, name='streaming'),
]
