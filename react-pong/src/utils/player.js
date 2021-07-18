function drawPlayer(gd) {
	document.onkeydown = (e) => {
		if (e.code === "ArrowUp") {
				gd.goup = true;
		}
		else if (e.code === "ArrowDown") {
			 gd.godown = true;
		}
	}
	document.onkeyup = (e) => {
		if (e.code === "ArrowUp") {
				gd.goup = false;
		}
		else if (e.code === "ArrowDown") {
			 gd.godown = false;
		}
	}
	if (gd.goup) gd.posRack1 -=5; if (gd.posRack1 < 0) gd.posRack1 = 0;
	if (gd.godown) gd.posRack1 += 5; if (gd.posRack1 + gd.height / 5 > gd.height) gd.posRack1 = gd.height*0.8
	gd.ctx.beginPath();
	var grad1 = gd.ctx.createLinearGradient(10, gd.posRack1, 30, gd.posRack1 + gd.height / 5);
  grad1.addColorStop(0, 'blue');
  grad1.addColorStop(0.5, 'violet');
	gd.ctx.fillStyle = grad1;
	gd.ctx.rect(10, gd.posRack1, 20, gd.height / 5);
	gd.ctx.fill();
	gd.ctx.strokeStyle = "black";
	gd.ctx.stroke();
	gd.ctx.closePath();

	gd.ctx.beginPath();
	var grad2 = gd.ctx.createLinearGradient(gd.width - 30, gd.posRack2, gd.width, gd.posRack2 + gd.height / 5);
  grad2.addColorStop(0, 'yellow');
  grad2.addColorStop(0.5, 'green');
	gd.ctx.fillStyle = grad2;
	gd.ctx.rect(gd.width - 30, gd.posRack2, 20, gd.height / 5);
	gd.ctx.fill();

	gd.ctx.strokeStyle = "black";
	gd.ctx.stroke();
	gd.ctx.closePath();
	checkCollision(gd);
}

function checkCollision (gd) {
	if ((gd.ballx - gd.radius <= 30 ) && ((gd.bally >= gd.posRack1) && (gd.bally <= gd.posRack1 + gd.height / 5)))
	{
		gd.dx *= -1;
		console.log('ballx=',gd.ballx,'bally=',gd.bally)
	}
}
module.exports = { drawPlayer };
