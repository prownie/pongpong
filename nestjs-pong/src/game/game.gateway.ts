import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
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
    //if there is someone in matchmaking for same mod

    var roomid = generateRoomId();
    client.data.username=message.username;
    //if noone is found, add to room[matchtype], waiting for someone
    client.join(message.matchtype);
    console.log(this.wss.adapter.rooms);
    // if(io.sockets.client()/*[message.matchtype]*/){
    //   console.log("rooms exist, wow !");
    // }
    console.log('client',client.data.username, 'joined matchmaking for :',message.matchtype);
    client.emit('inQueue',{ name : "badGuy" });
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
