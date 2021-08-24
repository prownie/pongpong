import React, { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
import { socket } from "../App";

//import Score from "./Score";
//import Field from "./Field";

const ball = require("../utils/ball");

const Pong = () => {
	const canvas = useRef(null);
	const [width, setWidth] = useState(window.innerWidth);
	const [height, setHeight] = useState(window.innerHeight);
	const [score, setScore] = useState(0);
	const [gameStart, setGameStart] = useState(false);
	const [position, setPosition] = useState(false);
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
	const canvasHeight = 40 * vh;
	const canvasWidth = 60 * vw;
	const [isReady, setIsReady] = useState(false);
	window.addEventListener("resize", () => {setWidth(window.innerWidth); setHeight(window.innerHeight)});

	const blabla = () => {
		setScore(score+1);
	}

	useEffect(() => {
		document.getElementById('scorej1').innerText=score;
		console.log('score changed');
		var gameData = {
			username: 'test',//prompt("Enter your username"),
			direction: 1,
			balldx: gameStart ? 2 : 0,
			balldy: 0.00,
			speed: gameStart ? 1 : 0,
			test: 0,
			vw: vw,
			vh: vh,
			radius: canvasWidth / 100,
			width: canvasWidth,
			height: canvasHeight,
			ballx: canvasWidth / 2,
			bally: canvasHeight / 2,
			posRack1: canvasHeight / 2 - canvasHeight / 10,
			posRack2: canvasHeight / 2 - canvasHeight / 10,
			rackWidth: canvasWidth / 50,
			rackHeight: canvasHeight / 5,
			goup1: false,
			godown1: false,
			goup2: false,
			godown2: false,
			position: position,
			ctx: document.getElementById("canvas").getContext('2d'),
			socket: socket,
			ready: false,
			setScore: blabla,
			gameStart: gameStart,
		};
		socket.on("movePadClient", (socket) => {
			if (typeof socket.goup2 !== "undefined")
				{gameData.goup2 = socket.goup2;console.log("goup2 updated");}
			else console.log("goup2 not updated");
			if (typeof socket.godown2 !== "undefined")
				{gameData.godown2 = socket.godown2;console.log("godown2 updated");}
			else console.log("godown2 not updated");
			if (typeof socket.goup1 !== "undefined")
				{gameData.goup1 = socket.goup1;console.log("goup1 updated");}
			else console.log("goup1 not updated");
			if (typeof socket.godown1 !== "undefined")
				{gameData.godown1 = socket.godown1;console.log("godown1 updated");}
			else console.log("godown1 not updated");
			if (typeof socket.posRack1 !== "undefined") gameData.posRack1 = socket.posRack1;
			if (typeof socket.posRack2 !== "undefined") gameData.posRack2 = socket.posRack2;
		});
		socket.on("moveBallClient", (socket) => {
			console.log("before assignation:ballx=",gameData.ballx,
			"bally=",gameData.bally,
			"balldx=",gameData.balldx,
			"balldy=",gameData.balldy,
			"isNaN ballx:",isNaN(socket.ballx))
			if (!isNaN(socket.ballx)) gameData.ballx = socket.ballx;
			if (!isNaN(socket.bally))gameData.bally = socket.bally;
			gameData.dx = socket.balldx;
			gameData.dy = socket.balldy;
			gameData.speed = socket.speed;
			console.log("after assignation:ballx=",gameData.ballx,
			"bally=",gameData.bally)
		});
		socket.on("whichSide", (socket) => {
			setPosition(parseInt(socket.position));
			console.log("assignation: position = ",socket.position);
		});
		socket.on("gameStarting", (socket) => {
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
	}, [score, height, width, canvasHeight, canvasWidth,vw,vh, position, gameStart])

	console.count('render');

  return (
    <div>
      <div id="scorej1">

 

        {/* <Score score={score}/> */}
      </div>
			<div id="pong">
				<canvas id="canvas" ref={canvas} width={60*vw} height={40*vh}>
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
