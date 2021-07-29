function drawPlayer(gd) {
	document.onkeydown = (e) => {
		if (e.code === "ArrowUp") {
				if(gd.goup === true)
					return;
				gd.goup = true;
				console.log('here1');
				gd.socket.emit('test', "hello");
				gd.socket.emit('gameToServer', {
					upArrow: gd.goup,
     			downArrow: gd.godown,
     			ballx: gd.ballx,
     			bally: gd.bally,
     			speed: gd.speed,
     			balldx: gd.dx,
     			balldy: gd.dy,
				})
		}
		else if (e.code === "ArrowDown") {
			if(gd.godown === true)
					return;
			 gd.godown = true;
			 console.log('here2');
			 gd.socket.emit('gameToServer', {
				upArrow: gd.goup,
				 downArrow: gd.godown,
				 ballx: gd.ballx,
				 bally: gd.bally,
				 speed: gd.speed,
				 balldx: gd.dx,
				 balldy: gd.dy,
			})
		}
	}
	document.onkeyup = (e) => {
		if (e.code === "ArrowUp") {
			if(gd.goup === false)
					return;
				gd.goup = false;
				console.log('here3');
				gd.socket.emit('gameToServer', {
					upArrow: gd.goup,
     			downArrow: gd.godown,
     			ballx: gd.ballx,
     			bally: gd.bally,
     			speed: gd.speed,
     			balldx: gd.dx,
     			balldy: gd.dy,
				})
		}
		else if (e.code === "ArrowDown") {
			if(gd.godown === false)
					return;
			 gd.godown = false;
			 console.log('here4');
			 gd.socket.emit('gameToServer', {
				upArrow: gd.goup,
				 downArrow: gd.godown,
				 ballx: gd.ballx,
				 bally: gd.bally,
				 speed: gd.speed,
				 balldx: gd.dx,
				 balldy: gd.dy,
			})
		}
	}
	if (gd.goup) gd.posRack1 -=5; if (gd.posRack1 < 0) gd.posRack1 = 0;
	if (gd.godown) gd.posRack1 += 5; if (gd.posRack1 + gd.rackHeight >= gd.height) gd.posRack1 = gd.height-gd.rackHeight
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
  	gd.dx = gd.direction * gd.speed * Math.cos(angleRad);
  	gd.dy = gd.speed * Math.sin(angleRad);
		if (gd.speed <= 7.0)
			gd.speed += 0.5;
	}

	//Check where the ball hits the paddle

}
module.exports = { drawPlayer };
