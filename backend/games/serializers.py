from rest_framework import serializers
from games.models import Game

class GameHistorySerializer(serializers.ModelSerializer):
    opponent = serializers.SerializerMethodField()
    result = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ('game_type', 'opponent', 'date', 'moves', 'result')

    def get_opponent(self, obj):
        user = self.context['request'].user
        if obj.white_player == user:
            return obj.black_player.username
        return obj.white_player.username

    def get_result(self, obj):
        user = self.context['request'].user
        if obj.winner == user:
            return "win"
        else:
            return "loss"