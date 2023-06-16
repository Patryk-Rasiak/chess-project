from django.urls import path

from users.views import ProfileViewSet

urlpatterns = [
    path('profile/', ProfileViewSet.as_view({'get': 'retrieve'})),
]