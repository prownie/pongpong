import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway(3001)
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('gameToServer')
  handleMessage(client: Socket,
    message: {
      upArrow: boolean,
      downArrow: boolean,
      ballx: number,
      bally: number,
      speed: number,
      balldx: number,
      balldy: number,
    })  {
    client.broadcast.emit('gameToClient', message);
  }




  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
  }

}
