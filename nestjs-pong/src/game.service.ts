import { Injectable } from "@nestjs/common";
import { gameData } from "./interfaces/gameData.interface";

@Injectable()
export class GamingRoom {
	private _scoreP1: number;
	private _scoreP2: number;
	private _nameP1: string;
	private _nameP2: string;
	private _isP1Ready: boolean;
	private _isP2Ready: boolean;
	private _gameData: gameData;

	private constructor(p1: string, p2: string) {
		this._nameP1 = p1;
		this._nameP2 = p2;
		this._scoreP1 = 0;
		this._scoreP2 = 0;
		this._isP1Ready = false;
		this._isP2Ready = false;
	}

	public static create(p1: string, p2: string) {
		return new GamingRoom(p1, p2);
	}

	public updateScore(player: string) {
		if (this._nameP1 === player)
			this._scoreP1++;
		else if  (this._nameP2 === player)
			this._scoreP2++;
	}
}
