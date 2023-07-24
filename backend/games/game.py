import random
from json import JSONEncoder

games = {}

class Player:
    def __init__(self, name, color, player_id, game_id):
        self.name = name
        self.color = color
        self.player_id = player_id
        self.game_id = game_id

class PlayerEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Player):
            return obj.__dict__
        return super().default(obj)

def add_player(data):
    game_id = data['game_id']
    name = data['name']
    player_id = data['player_id']
    if game_id not in games:
        color = 'w' if random.random() <= 0.5 else 'b'
        player = Player(name, color, player_id, game_id)
        games[game_id] = [player]
        return None, player, None
    elif len(games[game_id]) >= 2:
        return 'This game is full', None, None
    else:
        opponent = games[game_id][0]
        color = 'b' if opponent.color == 'w' else 'w'
        player = Player(name, color, player_id, game_id)
        games[game_id].append(player)
        return None, player, opponent


def remove_player(player_id):
    for game_id, players in games.items():
        for index, player in enumerate(players):
            if player.player_id == player_id:
                player = players.pop(index)
                if len(players) == 0:
                    del games[game_id]
                return player
    return None


def get_game(game_id):
    return games.get(game_id, [])
