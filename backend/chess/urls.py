from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('chess_auth.urls')),
    path('users/', include('users.urls')),
    path('', include('games.urls')),
]
