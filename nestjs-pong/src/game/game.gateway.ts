import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { generateRoomId } from './gameGateway.functions';
import { ClientRequest } from 'http';
import { gameData } from '../interfaces/gameData.interface';

@WebSocketGateway(3001)
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private server: Server;

  private logger: Logger = new Logger('GameGateway');

  @SubscribeMessage('gameToServer')
  handleMessage(client: Socket,
    gameData: gameData){
    client.broadcast.emit('gameToClient', gameData);
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

    console.log(this.server.sockets.adapter.rooms.get(message.matchtype));
    client.join(message.matchtype);
    console.log(client.rooms, ' message type :', message.matchtype);
    // if(io.sockets.client()/*[message.matchtype]*/){
    //   console.log("rooms exist, wow !");
    // }
    console.log('client',client.data.username, 'joined matchmaking for :',message.matchtype);
    client.emit('inQueue',{ name : "badGuy" });
  }

  afterInit(server: Server) {
    this.server = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`)
    //client.data.username = "player"+
  }

}
