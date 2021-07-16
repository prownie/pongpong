import React, { useEffect, useRef, useState } from 'react';

//Components
import Score from './Score';
import Field from './Field';

const Pong = () => {

	const[ctx, setCtx] = useState(null)
	const canvas = useRef(null);
	const [scorej1, setJ1] = useState(0)

	useEffect(() => {
		setCtx(canvas.current.getContext('2d'))
	 }, [ctx])

	const j1scored = () => {
		setJ1(scorej1 + 1);
	}

	console.count('render')
	console.log('score j1 = ' + scorej1);
	return (
	<div>
		<div id='scorej1'>{scorej1}</div>
		<canvas ref = {canvas}
			width={600}
			height={400}>

			<Score />
			{canvas.current&&<Field
			ctx={canvas.current.getContext('2d')}
			width={canvas.current.width}
			height={canvas.current.height}
			j1scored={j1scored}
			/>}
		</canvas>
	</div>
	);
};

export default Pong;
