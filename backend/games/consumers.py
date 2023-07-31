from channels.generic.websocket import AsyncWebsocketConsumer
import json
from games.game import get_game, remove_player, PlayerEncoder, find_game
from games.models import Game
import logging
from asgiref.sync import sync_to_async

player_encoder = PlayerEncoder()
logger = logging.getLogger(__name__)

class GameConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        remove_player(self.scope['session'].get('user_id'))

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        event = json.loads(text_data)
        data = event.get('data', {})
        match event['type']:
            case 'join':
                await self.join_game(data)
            case 'move':
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'move',
                        'data': data,
                        'sender': self.scope['session']['user_id'],
                    }
                )
            case 'quit':
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'quit_game',
                        'sender': self.scope['session']['user_id'],
                    }
                )
            case 'gameOver':
                await self.game_over(data)

    async def join_game(self, data):
        name = data.get('name')
        user_id = data.get('userID')

        error, game_id, player, opponent = await sync_to_async(find_game)({
            'name': name,
            'player_id': user_id,
        })

        self.room_group_name = game_id

        if len(get_game(self.room_group_name)) > 2:
            await self.close()
            return

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        if error:
            logger.error(f"\n\nERROR:\n{error}\n\n")
        else:
            self.scope['session']['user_id'] = user_id
            self.scope['session']['player_color'] = player.color
            logger.info(f"Saving user: {user_id} with color: {player.color}")

            await sync_to_async(self.scope['session'].save)()


            if len(get_game(self.room_group_name)) >= 2:

                white_player = next((player for player in get_game(self.room_group_name) if player.color == 'w'), None)
                black_player = next((player for player in get_game(self.room_group_name) if player.color == 'b'), None)
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'start_game',
                        'data': {
                            'whitePlayer': player_encoder.default(white_player),
                            'blackPlayer': player_encoder.default(black_player),
                        }
                    }
                )

    async def move(self, event):
        if self.scope['session']['user_id'] == event['sender']:
            return
        data = event['data']
        await self.send(json.dumps({
            'type': 'opponentMove',
            'data': data,
        }))

    async def start_game(self, event):
        data = event['data']
        await self.send(json.dumps({
            'type': 'startGame',
            'data': data,
        }))

    async def quit_game(self, event):
        if self.scope['session']['user_id'] == event['sender']:
            return

        await self.send(json.dumps({
            'type': 'opponentLeft',
        }))

    async def game_over(self, data):
        player_id = self.scope['session']['user_id']
        opponent_id = next((player.player_id for player in get_game(self.room_group_name) if player.player_id != player_id), None)

        player_color = self.scope['session']['player_color']
        status = data['status']
        turn = data['turn']
        moves = data['moves'] // 2

        white_player = player_id if player_color == 'w' else opponent_id
        black_player = player_id if player_color == 'b' else opponent_id

        if status == 'checkmate':
            winner_id = player_id if turn != player_color else opponent_id
        elif status == 'resignation':
            winner_id = player_id if turn == player_color else opponent_id
        else:
            winner_id = None

        if player_id == winner_id:
            await sync_to_async(Game.objects.create)(
                white_player_id=white_player,
                black_player_id=black_player,
                winner_id=winner_id,
                game_type='rapid',
                moves=moves
            )
        elif winner_id is None:
            await sync_to_async(Game.objects.create)(
                white_player_id=white_player,
                black_player_id=black_player,
                game_type='rapid',
                moves=moves
            )
