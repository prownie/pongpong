import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { gameData } from "./interfaces/gameData.interface";
import { RoomService } from "./room.service";

@Injectable()
export class SocketService {
	public constructor(
		private readonly roomService: RoomService,
	) {}

	private _server: Server;

	public init(server: Server): void {
		this._server = server;
		this.roomService.init(this._server);
	}

	public joinMatchMaking(client: Socket, message: { matchtype: string, username: string }): void {
		if (['ranked','quickplay','footpong'].indexOf(message.matchtype) < 0)
			return;
		if (client.data.inGame)
		{
			console.log("already in a game, cant start another one");
			return;
		}
		/*
		USERNAME SHOULD BE WRITTEN ON THE HANDLECONNECTION EVENT
		WAITING FOR JUAN'S WORK
		*/
		client.data.username = message.username;
		// if rooms exists, then there is already someone looking for a game
		if (this._server.sockets.adapter.rooms.get(message.matchtype)){
			let opponentId = this.roomService.getUsers(message.matchtype).values().next().value;
			let opponent = this._server.sockets.sockets.get(opponentId);
			let newRoomId = this.roomService.createNewRoom(client, opponent);
			//join new room and clear matchmaking room
			client.join(newRoomId);
			opponent.join(newRoomId);
			opponent.leave(message.matchtype);
			this._server.to(newRoomId).emit('opponentFound',"opponent found, game starting")
			client.data.inGame = true;
			client.data.gameRoomId = newRoomId;
			opponent.data.inGame = true;
			opponent.data.gameRoomId = newRoomId;
		}
		else {
			//join matchmaking queue and answer to client
			client.join(message.matchtype);
			client.emit('inQueue');
		}
	}

	public sendGameData(client: Socket, gameData: gameData): void {
		client.broadcast.to(client.data.gameRoomId).emit('gameToClient', gameData);
	}
}
