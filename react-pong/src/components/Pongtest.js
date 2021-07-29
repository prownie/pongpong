import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

//import Score from "./Score";
import Field from "./Field";

const ball = require("../utils/ball");

const Pong = () => {
  const [ctx, setCtx] = useState(null);
  const canvas = useRef(null);
	const [toto, setToto] = useState({score1:0, score2:0});
	const [score, setScore] = useState(0);
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;
	var i = 1;

	const blabla = () => {
		setScore(score+1);
	}

	useEffect(() => {
		document.getElementById('scorej1').innerText=score;
		console.log('score changed');
		const socket= io('http://localhost:3001', {
			transports: ['websocket']
		});
		var gameData = {
			direction: -1,
			dx: -2,
			dy: 0.00,
			speed: 2,
			test: 0,
			radius: 60 * window.innerWidth / 12000,
			width: 60 * window.innerWidth / 100,
			height: 40 * window.innerHeight / 100,
			ballx: 60 * window.innerWidth / 200,
			bally: 40 * window.innerHeight / 200,
			posRack1: 40 * window.innerHeight / 100 * 0.4,
			posRack2: 40 * window.innerHeight / 100 * 0.4,
			rackWidth: 60 * window.innerWidth / 6000,
			rackHeight: 40 * window.innerHeight / 500,
			goup: false,
			godown: false,
			ctx: document.getElementById("canvas").getContext('2d'),
			socket: socket,
			setScore : blabla,
		};
		socket.on("gameToClient", (socket) => {
			gameData.goup = socket.upArrow;
			gameData.godown = socket.downArrow;
			gameData.ballx = socket.ballx;
			gameData.bally = socket.bally;
			gameData.dx = socket.balldx;
			gameData.dy = socket.balldy;
			console.log('in gameToClient');
		});
		console.log('socket: ',gameData.socket);
		ball.animate(gameData)
	}, [score])

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
