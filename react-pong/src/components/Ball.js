import React from 'react';

const Ball = (props) => {
	const {ctx,width,height,j1scored} = props;

	var x = 300//Math.random() * 600;
	var y = 200//Math.random() * 200;
	var dx = 1;
	var dy = 1;
	var radius = 10;


	function animate() {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, width, height);
		ctx.beginPath();
		//var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
		var radgrad = ctx.createRadialGradient(x, y, radius, x-radius/2, y-radius/2, 0);
		radgrad.addColorStop(0, '#D8D8D8');
		radgrad.addColorStop(0, '#595656');
		radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');

		ctx.arc(x, y, radius, 0, Math.PI * 2, false);
		ctx.fillStyle = radgrad;
		ctx.fill();
		ctx.strokeStyle = 'grey';
		ctx.stroke();

		if (x + radius>= width || x - radius <= 0)
			{dx *= -1;j1scored();}
		if (y + radius>= height || y - radius <= 0)
			dy *= -1;

		x += dx;
		y += dy;
	}
	animate();
	return (
		<div>

		</div>
	);
};

export default Ball;
