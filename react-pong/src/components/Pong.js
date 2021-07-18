import React, { useEffect, useRef, useState } from "react";

import Score from "./Score";
import Field from "./Field";

const ball = require("../utils/ball");

const Pong = () => {
  const [ctx, setCtx] = useState(null);
  const canvas = useRef(null);
  const [toto, setToto] = useState({scorej1: 0,scorej2: 0,})
	const [score, setScore] = useState(0);

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
			ballx: 300,
			bally: 200,
			dx: -2,
			dy: 1,
			radius: 10,
			width: 600,
			height: 400,
			posRack1: 160,
			posRack2: 160,
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
      <canvas id="canvas" ref={canvas} width={600} height={400}>
        {/*{canvas.current&&<Field
			ctx={canvas.current.getContext('2d')}
			width={canvas.current.width}
			height={canvas.current.height}
			j1scored={j1scored}
			/>}*/}
      </canvas>
    </div>
  );
};

export default Pong;
