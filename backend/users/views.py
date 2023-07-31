from django.db.models import Q

from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from users.models import Profile
from users.serializers import ProfileSerializer
from games.serializers import GameHistorySerializer
from games.models import Game

class ProfileViewSet(RetrieveModelMixin, GenericViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user.profile

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        games = Game.objects.filter(Q(white_player=instance.user) | Q(black_player=instance.user)).order_by('-date')

        game_history_serializer = GameHistorySerializer(games, many=True, context={'request': request})

        data = {
            "username": instance.user.username,
            "games_history": game_history_serializer.data,
            **serializer.data
        }
        return Response(data)
