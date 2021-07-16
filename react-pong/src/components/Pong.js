import React, { useEffect, useRef, useState } from 'react';

//Components
import Score from './Score';
import Field from './Field';

const Pong = () => {

	const[image, setImage] = useState(null)

	useEffect(() => {
		const catImage = new Image();
		catImage.src = "http://thiscatdoesnotexist.com/"
		catImage.onload = () => setImage(catImage)
	}, [])

	const canvas = useRef(null)

	useEffect(() => {
		if (image && canvas) {
			const ctx = canvas.current.getContext('2d')
			ctx.beginPath();
			ctx.fillStyle = "black"
			ctx.fillRect(0, 0, 50, 100)
			ctx.stroke();
		}
	}, [image, canvas])

	return (
	<div>
		<canvas ref = {canvas}>
			<Score />
			{/* <Field value={canvas.current}/> */}
		</canvas>
	</div>
	);
};

export default Pong;
