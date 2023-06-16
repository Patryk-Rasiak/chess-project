from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.models import Profile
from users.serializers import ProfileSerializer


class ProfileViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.profile

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        data = {
            "username": instance.user.username,
            "games_history": [],
            **serializer.data
        }
        return Response(data)
