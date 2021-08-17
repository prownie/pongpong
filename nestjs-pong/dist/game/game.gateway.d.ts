import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    private logger;
    handleMessage(client: Socket, message: {
        ballx: number;
        bally: number;
        speed: number;
        balldx: number;
        balldy: number;
        posRack1: number;
        posRack2: number;
        username: string;
    }): void;
    handleStartMatchmaking(client: Socket, message: {
        matchtype: string;
        username: string;
    }): void;
    afterInit(server: any): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
