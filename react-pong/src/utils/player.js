function drawPlayer(gd) {
	if (gd.gameStart === false) {
		document.onkeydown = (e) => {
			gd.socket.emit('playerReady');
			gd.ready = true;
		}
		console.log("has returned in ready check, ready=",gd.ready);
		return;
	}
	gd.ctx.globalAlpha = 1;

	document.onkeydown = (e) => {
		if (e.code === "ArrowUp") {
			if (!((gd.position === 1 && gd.goup1 === true) || (gd.position === 2 && gd.goup2 === true))) {
			if (gd.position === 1) gd.goup1 = true; else if (gd.position === 2) gd.goup2 = true;
			console.log("position =",gd.position);
			movePadToServ(gd);
		}}
		else if (e.code === "ArrowDown") {
			if (!((gd.position === 1 && gd.godown1 === true) || (gd.position === 2 && gd.godown2 === true))) {
				if (gd.position === 1) gd.godown1 = true; else if (gd.position === 2) gd.godown2 = true;
				console.log("position =",gd.position);
				movePadToServ(gd);
		}}
	}
	document.onkeyup = (e) => {
		if (e.code === "ArrowUp") {
			if (gd.position === 1) gd.goup1 = false; else if (gd.position === 2) gd.goup2 = false;
			console.log("position =",gd.position);
			movePadToServ(gd);
		}
		else if (e.code === "ArrowDown") {
			if (gd.position === 1) gd.godown1 = false; else if (gd.position === 2) gd.godown2 = false;
			console.log("position =",gd.position);
			movePadToServ(gd);}
	}
	if (gd.goup1) gd.posRack1 -= 0.8 * gd.vh; if (gd.posRack1 < 0) gd.posRack1 = 0;
	if (gd.godown1) gd.posRack1 += 0.8 * gd.vh; if (gd.posRack1 + gd.rackHeight >= gd.height) gd.posRack1 = gd.height-gd.rackHeight
	if (gd.goup2) gd.posRack2 -= 0.8 * gd.vh; if (gd.posRack2 < 0) gd.posRack2 = 0;
	if (gd.godown2) gd.posRack2 += 0.8 * gd.vh; if (gd.posRack2 + gd.rackHeight >= gd.height) gd.posRack2 = gd.height-gd.rackHeight

	gd.ctx.beginPath();
	var grad1 = gd.ctx.createLinearGradient(0, gd.posRack1, gd.rackWidth, gd.posRack1 + gd.rackHeight);
  grad1.addColorStop(0, 'blue');
  grad1.addColorStop(0.5, 'violet');
	gd.ctx.linecap = 'round';
	gd.ctx.fillStyle = grad1;
	gd.ctx.rect(0, gd.posRack1, gd.rackWidth, gd.rackHeight);
	gd.ctx.fill();
	gd.ctx.strokeStyle = "black";
	gd.ctx.stroke();
	gd.ctx.closePath();


	gd.ctx.beginPath();
	var grad2 = gd.ctx.createLinearGradient(gd.width - gd.rackWidth, gd.posRack2, gd.width, gd.posRack2 + gd.rackHeight);
  grad2.addColorStop(0, 'yellow');
  grad2.addColorStop(0.5, 'green');
	gd.ctx.fillStyle = grad2;
	gd.ctx.rect(gd.width - gd.rackWidth, gd.posRack2, gd.rackWidth, gd.rackHeight);
	gd.ctx.fill();

	gd.ctx.strokeStyle = "black";
	gd.ctx.stroke();
	gd.ctx.closePath();


	// gd.ctx.beginPath();
	// gd.ctx.lineCap = 'round';
	// gd.ctx.lineWidth = 15;
	// gd.ctx.stroke();
	// gd.ctx.closePath();
	checkCollision(gd);
}

function checkCollision (gd) {
	var b = {};
	b.top = gd.bally - gd.radius;
	b.bottom = gd.bally + gd.radius;
	b.left = gd.ballx - gd.radius;
	b.right = gd.ballx + gd.radius;

	var p = {}
	p.top		= (gd.ballx < gd.width/2) ? gd.posRack1 : gd.posRack2;
	p.bottom= p.top + gd.rackHeight;
	p.left	= (gd.ballx < gd.width/2) ? 0 : (gd.width - gd.rackWidth);
	p.right = p.left + gd.rackWidth;

	//only check collision for client's side (1 for left,)

	// if ((gd.ballx < gd.width / 2 && gd.position === 1) || (gd.ballx > gd.width/2 && gd.position === 2))
	if (b.right >= p.left && b.bottom >= p.top && b.left <= p.right && b.top <= p.bottom)
	// if (b.left <= p.right && (b.bottom <= p.top))
	{
		var collidePoint;
		if (gd.ballx < gd.width/2)
			collidePoint = (gd.bally - (gd.posRack1 + gd.rackHeight/2));
		else
			collidePoint = (gd.bally - (gd.posRack2 + gd.rackHeight/2));
 		collidePoint = collidePoint / (gd.rackHeight/2);
		//now collide is almost between -1 and 1
		let angleRad = (Math.PI/4) * collidePoint;
		gd.direction *= -1;
  	gd.balldx = gd.direction * gd.speed * Math.cos(angleRad);
  	gd.balldy = gd.speed * Math.sin(angleRad);
		if (!(gd.ballx + gd.radius + gd.balldx >= gd.width || gd.ballx - gd.radius - gd.balldx <= 0)) gd.ballx += gd.balldx;
		if (!(gd.bally + gd.radius + gd.balldy >= gd.height || gd.bally - gd.radius - gd.balldy <= 0)) gd.bally += gd.balldy;
		if (gd.speed <= 5.0 /** gd.vw*/)
			gd.speed += 1;
			//only send data ball if needed (correct side)
		// if ((gd.ballx < gd.width / 2 && gd.position === 1) || (gd.ballx > gd.width/2 && gd.position === 2))
		moveBallToServ(gd);
	}

	//Check where the ball hits the paddle
	console.log("balldx = ",gd.balldx,"balldy = ",gd.balldy);
}

const movePadToServ = (gd) => {
	gd.socket.emit('movePad', {
		goup1: gd.position === 1 ? gd.goup1 : undefined,
		godown1: gd.position === 1 ? gd.godown1 : undefined,
		posRack1: gd.position === 1 ? gd.posRack1 : undefined,

		goup2: gd.position === 2 ? gd.goup2 : undefined,
		godown2:gd.position === 2 ? gd.godown2 : undefined,
		posRack2: gd.position === 2 ? gd.posRack2 : undefined,

		position: gd.position,
	});
};

const moveBallToServ = (gd) => {
	console.log("position in moveballtoserv =",gd.position)
	gd.socket.emit('moveBall', {
		ballx: gd.ballx,
		bally: gd.bally,
		balldx: gd.balldx,
		balldy: gd.balldy,
		speed: gd.speed,
		position: gd.position,
	});
};

module.exports = { drawPlayer };
