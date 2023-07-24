from django.urls import path
from chess_auth.views import RegisterView, LoginView, UsernameView
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/' , RegisterView.as_view(), name='register'),
    path('username/', UsernameView.as_view(), name='username'),
]