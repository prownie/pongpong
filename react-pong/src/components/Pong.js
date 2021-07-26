import React, { useEffect, useRef, useState } from "react";

import Score from "./Score";
import Field from "./Field";

const ball = require("../utils/ball");

const Pong = () => {
  const [ctx, setCtx] = useState(null);
  const canvas = useRef(null);
  
	const [score, setScore] = useState(0);
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) /100;
	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) /100;

	const blabla = () => {
		setScore(score+1);
	}

	useEffect(() => {
		document.getElementById('scorej1').innerText=score;
	})

  useEffect(() => {
		setCtx(canvas.current.getContext('2d'))
  }, [ctx]);

	if (ctx) {
		var gameData = {
			direction: -1,
			dx: 1.2,
			dy: 1.0,
			angleRad:
			radius: 60 * window.innerWidth / 6000,
			width: 60 * window.innerWidth / 100,
			height: 40 * window.innerHeight / 100,
			ballx: 60 * window.innerWidth / 200,
			bally: 40 * window.innerHeight / 200,
			posRack1: 40 * window.innerHeight / 100 * 0.4,
			posRack2: 40 * window.innerHeight / 100 * 0.4,
			rackWidth: 60 * window.innerWidth / 3000,
			rackHeight:  40 * window.innerHeight / 500,
			goup: false,
			godown: false,
			ctx: document.getElementById("canvas").getContext('2d'),
			setScore : blabla
		}
		ball.animate(gameData)
	}



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
