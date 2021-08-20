import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from '../socket.service';
import { gameData } from '../interfaces/gameData.interface';
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly socketService;
    constructor(socketService: SocketService);
    private _server;
    private logger;
    handleMessage(client: Socket, gameData: gameData): void;
    handleStartMatchmaking(client: Socket, message: {
        matchtype: string;
        username: string;
    }): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
