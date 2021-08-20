import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketService } from '../socket.service';
import { gameData } from '../interfaces/gameData.interface';


@WebSocketGateway(3001)
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  public constructor(
    private readonly socketService: SocketService,
  ) {}

  private _server: Server;
  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('gameToServer')
  handleMessage(client: Socket, gameData: gameData){
    this.socketService.sendGameData(client, gameData);
  }

  @SubscribeMessage('startMatchmaking')
  handleStartMatchmaking(client: Socket, message: { matchtype: string, username: string })  {
    this.socketService.joinMatchMaking(client, message);
  }

  afterInit(server: Server) {
    this._server = server;
    this.socketService.init(this._server);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
    //client.data.username = "player"+
  }

}
