from django.urls import path

from games import consumers

websocket_urlpatterns = [
    path('game/', consumers.GameConsumer.as_asgi()),
]