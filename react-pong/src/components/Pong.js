import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import { socket } from "../App";

//import Score from "./Score";
//import Field from "./Field";

const ball = require("../utils/ball");

const Pong = () => {
	const canvas = useRef(null);
	const [score, setScore] = useState(0);
	const [gameWidth, setGameWidth] = useState(0);
	const [gameHeight, setGameHeight] = useState(0);
	const [gameStart, setGameStart] = useState(false);
	const [position, setPosition] = useState(false);
	const [isReady, setIsReady] = useState(false);

	window.addEventListener("resize", () => {
		calculateGameSize();
	})
	useEffect(() => {
		calculateGameSize();
	})


	function calculateGameSize() {
		const fieldHeight = window.innerHeight * 0.8;
		const fieldWidth = window.innerWidth * 0.8;
		if ( fieldHeight * 16/9 < fieldWidth) {
			setGameWidth(16/9 * fieldHeight);
			setGameHeight(fieldHeight);
		}
		else {
			setGameHeight(fieldWidth * 9/16);
			setGameWidth(fieldWidth);
		}
	};

	const blabla = () => {
		setScore(score+1);
	}

	useEffect(() => {
		console.log("rerender animate ?");
		var gameData = {
			username: 'test',//prompt("Enter your username"),
			direction: 1,
			balldx: gameStart ? gameWidth * 0.2 / 100 : 0,
			balldy: 0.00,
			radius: gameWidth / 100,
			width: gameWidth,
			height: gameHeight,
			speed: 0,
			ballx: gameWidth / 2,
			bally: gameHeight / 2,
			posRack1: gameHeight / 2 - gameHeight / 10,
			posRack2: gameHeight / 2 - gameHeight / 10,
			rackWidth: gameWidth / 50,
			rackHeight: gameHeight / 5,
			goup1: false,
			godown1: false,
			goup2: false,
			godown2: false,
			position: position,
			ctx: document.getElementById("canvas").getContext('2d'),
			socket: socket,
			ready: isReady,
			setReady: setIsReady,
			setScore: blabla,
			gameStart: gameStart,
		};
		socket.on("movePadClient", (socket) => {
			if (typeof socket.goup2 !== "undefined")
				gameData.goup2 = socket.goup2;
			if (typeof socket.godown2 !== "undefined")
				gameData.godown2 = socket.godown2;
			if (typeof socket.goup1 !== "undefined")
				gameData.goup1 = socket.goup1;
			if (typeof socket.godown1 !== "undefined")
				gameData.godown1 = socket.godown1;
			if (typeof socket.posRack1 !== "undefined") gameData.posRack1 = socket.posRack1 * gameData.height;
			if (typeof socket.posRack2 !== "undefined") gameData.posRack2 = socket.posRack2 * gameData.height;
		});
		socket.on("moveBallClient", (socket) => {
			if (!isNaN(socket.ballx)) gameData.ballx = socket.ballx * gameData.width;
			if (!isNaN(socket.bally)) gameData.bally = socket.bally * gameData.height;
			gameData.dx = socket.balldx;
			gameData.dy = socket.balldy;
			gameData.speed = socket.speed * gameData.width;
			console.log("speedReceived=",gameData.speed);
		});
		socket.on("whichSide", (socket) => {
			setPosition(parseInt(socket.position));
			console.log("assignation: position = ",socket.position);
		});
		socket.on("gameStarting", (socket) => {
			console.log("game starting");
			setGameStart(true);
		});
		ball.animate(gameData)
		// else {
		// 	console.log('in return 1');
		// 	return () => {
		// 		<div id="matchmaking">
		// 			Waiting for opponent
		// 		</div>
		// 	}
		// }
	}, [score, gameHeight, gameWidth, position, gameStart, isReady])





	console.count('render');
  return (
    <div id="gameField">
      <div id="score" style={{
        width: gameWidth, height: gameHeight / 9
      }}>

			SCORE
        {/* <Score score={score}/> */}
      </div>
			<div id="pong" style={{
        width: gameWidth, height: gameHeight
      }}>
				<canvas id="canvas" ref={canvas} width={gameWidth} height={gameHeight}>
					{/*{canvas.current&&<Field
						ctx={canvas.current.getContext('2d')}
						width={canvas.current.width}
						height={canvas.current.height}
						j1scored={j1scored}
						/>}*/}
				</canvas>
			</div>
	</div>
  );
};


export default Pong;
