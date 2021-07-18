import React, { useEffect, useRef, useState } from "react";

import Score from "./Score";
import Field from "./Field";

const ball = require("../utils/ball");
const Pong = () => {
  const [ctx, setCtx] = useState(null);
  const canvas = useRef(null);
  const [toto, setToto] = useState({scorej1: 0,scorej2: 0,})
	const [score, setScore] = useState(0);
	var i = 1;

	const blabla = () => {
		setScore(score+1);
	}

  useEffect(() => {
		setCtx(canvas.current.getContext('2d'))
  }, [ctx]);

	useEffect(() => {
		document.getElementById('scorej1').innerText=score;
	}, [score])

	if (ctx && i-- > 0)
		ball.animate(300, 200, 1, 1, 10, 600, 400, blabla)


	console.count('render');
  return (
    <div>
      <div id="scorej1">
        {/* <Score /> */}
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
