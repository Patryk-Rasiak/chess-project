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

def find_game(data):
    name = data['name']
    player_id = data['player_id']

    for game_id, players in games.items():

        if len(players) == 1:
            opponent = players[0]
            color = 'b' if opponent.color == 'w' else 'w'
            player = Player(name, color, player_id, game_id)
            players.append(player)
            return None, game_id, player, opponent

    game_id = str(random.randint(100000, 999999))
    while game_id in games:
        game_id = str(random.randint(100000, 999999))
    color = 'w' if random.random() <= 0.5 else 'b'
    player = Player(name, color, player_id, game_id)
    games[game_id] = [player]
    return None, game_id, player, None



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

def get_games():
    return games

