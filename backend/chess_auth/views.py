from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from users.serializers import UserSerializer
from users.models import Profile

class LoginView(TokenObtainPairView):
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code != status.HTTP_200_OK:
            return response

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        access_token_str = response.data["access"]
        refresh_token_str = response.data["refresh"]

        access_token = AccessToken(access_token_str)
        owner_id = access_token["user_id"]

        username = User.objects.get(id=owner_id).username

        data = {
            "owner_username": username,
            "owner_id": owner_id,
            "access_token": access_token_str,
            "refresh_token": refresh_token_str,
        }

        return Response(data)


class RegisterView(APIView):
    serializer_class = UserSerializer
    authentication_classes = ()
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        Profile.objects.create(user=user)

        return Response(status=status.HTTP_201_CREATED)

class UsernameView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        return Response({"username": request.user.username})
