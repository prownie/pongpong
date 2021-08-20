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
	// const [isInGame, setInGame] = useState(false);
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
	const canvasHeight = 40 * vh;
	const canvasWidth = 60 * vw;
	const [isReady/*, setIsReady*/] = useState(false);
	window.addEventListener("resize", () => {setWidth(window.innerWidth); setHeight(window.innerHeight)});

	const blabla = () => {
		setScore(score+1);
	}

	useEffect(() => {
		document.getElementById('scorej1').innerText=score;
		console.log('score changed');
		// const socket= io('http://localhost:3001', {
		// 	transports: ['websocket']
		// });
		var gameData = {
			username: 'test',//prompt("Enter your username"),
			direction: 1,
			dx: 4,
			dy: 0.00,
			speed: -2,
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
			goup: false,
			godown: false,
			ctx: document.getElementById("canvas").getContext('2d'),
			socket: socket,
			setScore : blabla,
			ready: isReady,
		};
		socket.on("gameToClient", (socket) => {
			gameData.goup = socket.upArrow;
			gameData.godown = socket.downArrow;
			gameData.ballx = socket.ballx;
			gameData.bally = socket.bally;
			gameData.dx = socket.balldx;
			gameData.dy = socket.balldy;
			gameData.posRack1 = socket.posRack1;
			gameData.posRack2 = socket.posRack2
		});
		// if (isReady)
		ball.animate(gameData)
		// else {
		// 	console.log('in return 1');
		// 	return () => {
		// 		<div id="matchmaking">
		// 			Waiting for opponent
		// 		</div>
		// 	}
		// }
	}, [score, height, width, canvasHeight, canvasWidth,vw,vh,isReady])

	console.count('render');
//   if (isInGame === false)
//   {
// 	return (
// 		<div>
// 			not in game
// 		</div>
// 	);
//   }

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
