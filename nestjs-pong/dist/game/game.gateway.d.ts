import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from '../socket.service';
import { gameData } from '../interfaces/gameData.interface';
import { movePad } from 'src/interfaces/movePad.interface';
import { moveBall } from 'src/interfaces/moveBall.interface';
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly socketService;
    constructor(socketService: SocketService);
    private _server;
    private logger;
    handleGameToServer(client: Socket, gameData: gameData): void;
    handleMovePad(client: Socket, movePad: movePad): void;
    handleMoveBall(client: Socket, moveBall: moveBall): void;
    handleStartMatchmaking(client: Socket, message: {
        matchtype: string;
        username: string;
    }): void;
    handlePlayerReady(client: Socket): void;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
