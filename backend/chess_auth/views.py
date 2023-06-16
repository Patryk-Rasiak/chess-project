
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
        refresh_token = RefreshToken(refresh_token_str)

        access_token_expiry = access_token["exp"]
        refresh_token_expiry = refresh_token["exp"]
        owner_id = access_token["user_id"]

        data = {
            "owner_id": owner_id,
            "access_token": access_token_str,
            "refresh_token": refresh_token_str,
            "access_token_expiry": access_token_expiry,
            "refresh_token_expiry": refresh_token_expiry,
        }

        return Response(data)


class RegisterView(APIView):
    serializer_class = UserSerializer
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
