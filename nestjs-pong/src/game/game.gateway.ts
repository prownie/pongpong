import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
const io = require("../../node_modules/socket.io")
import { Logger } from '@nestjs/common';
import { generateRoomId } from './gameGateway.functions';

@WebSocketGateway(3001)
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('gameToServer')
  handleMessage(client: Socket,
    message: {
      ballx: number,
      bally: number,
      speed: number,
      balldx: number,
      balldy: number,
      posRack1: number,
      posRack2: number,
      username: string,
    })  {
    client.broadcast.emit('gameToClient', message);
  }

  @SubscribeMessage('startMatchmaking')
  handleStartMatchmaking(client: Socket,
    message: {
      matchtype: string,
      username: string,
    })  {
    var roomid = generateRoomId(/*io.sockets.adapter.rooms ? io.sockets.adapter.rooms : null*/);
    console.log('roomid on server:',roomid);
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
    //client.data.username = "player"+
  }

}
