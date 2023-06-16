from django.db import models

class Game(models.Model):
    id = models.AutoField(primary_key=True)
    white_player = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='white_player')
    black_player = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='black_player')
    winner = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name='winner')
    game_type = models.CharField(max_length=10)
    moves = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)


class GameReview(models.Model):
    game = models.OneToOneField('Game', on_delete=models.CASCADE, related_name='review', primary_key=True)
    moves = models.TextField()

    def set_moves(self, moves_list):
        self.moves = '\t'.join(moves_list)

    def get_moves(self):
        return self.moves.split('\t')