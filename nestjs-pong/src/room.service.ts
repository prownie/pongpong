import { Injectable } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { GamingRoom } from "./game.service";

@Injectable()
export class RoomService {
	private _server: Server;
	private _rooms : { [id: string]: GamingRoom } = {};

	public init(server: Server): void {
		this._server = server;
	}

	public createNewRoom(player1: Socket, player2: Socket) {
		let new_id;
		//check if roomId doesnt already exist
		do {
			new_id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
		} while (this._server.sockets.adapter.rooms.get(new_id));
		this._rooms[new_id] = GamingRoom.create(player1.data.username, player2.data.username);
		return (new_id);
	}

	public	playerScored(player: Socket, roomId: string) {
		this._rooms[roomId].updateScore(player.data.username);
	}

	public getUsers(roomId: string) {
		return this._server.sockets.adapter.rooms.get(roomId);
	}
}
