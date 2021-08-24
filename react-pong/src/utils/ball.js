const drawPlayer = require("../utils/player");

function animate(gd) {
  if (gd.ballx + gd.radius >= gd.width || gd.ballx - gd.radius <= 0) {gd.balldx *= -1; gd.direction *=-1;/*console.log('cabriselescouilles, leaving');gd.setScore();return;*/}
  gd.ctx.clearRect(0, 0, gd.width, gd.height);

  if (gd.bally + gd.radius >= gd.height || gd.bally - gd.radius <= 0) gd.balldy *= -1;
  gd.ballx += gd.balldx;
  gd.bally += gd.balldy;


// left player
if(gd.gameStart === false && gd.ready === false) {
  gd.ctx.beginPath();
  gd.ctx.fillStyle = "blue";
  gd.ctx.globalAlpha = 0.5;
  gd.ctx.fillRect(0,0,gd.width/2,gd.height);
  gd.ctx.font = "30px Arial";
  gd.ctx.fillText("Waiting for player",gd.rackWidth*2,gd.height/2);
  gd.ctx.fillText("Press any key",gd.rackWidth*2,gd.height/2+30);
  gd.ctx.closePath();
}


//right player
if(gd.gameStart === false) {
  gd.ctx.beginPath();
  gd.ctx.fillStyle = "green";
  gd.ctx.globalAlpha = 0.5;
  gd.ctx.fillRect(gd.width/2,0,gd.width/2,gd.height);
  gd.ctx.font = "30px Arial";
  gd.ctx.fillText("Waiting for player",gd.rackWidth*2 + gd.width/2,gd.height/2);
  gd.ctx.fillText("Press any key",gd.rackWidth*2 + gd.width/2,gd.height/2+30);
  gd.ctx.closePath();
}

//draw net
gd.ctx.beginPath();
gd.ctx.moveTo(gd.width/2,0);
gd.ctx.lineTo(gd.width/2,gd.height);
gd.ctx.stroke();
gd.ctx.closePath();

if (gd.gameStart === false) {
  document.onkeydown = (e) => {
    gd.socket.emit('playerReady');
    gd.setReady(true);
    console.log("setting ready");
  }
  console.log(gd.ready);
  // console.log("has returned in ready check, ready=",gd.ready,"gameStart=",gd.gameStart);
  return;
}
drawPlayer.drawPlayer(gd);


// gd.ctx.globalAlpha = 1;
gd.ctx.beginPath();

var radgrad = gd.ctx.createRadialGradient(
  gd.ballx,
  gd.bally,
  gd.radius,
  gd.ballx - gd.radius / 2,
  gd.bally - gd.radius / 2,
  0
);
radgrad.addColorStop(0, "#D8D8D8");
radgrad.addColorStop(0, "#595656");
radgrad.addColorStop(1, "rgba(1, 159, 98, 0)");
gd.ctx.arc(gd.ballx, gd.bally, gd.radius, 0, Math.PI * 2, false);
gd.ctx.fillStyle = radgrad;
gd.ctx.fill();
gd.ctx.strokeStyle = "grey";
gd.ctx.stroke();
gd.ctx.closePath();



requestAnimationFrame(() => {
  animate(gd);
});
}
module.exports = { animate };
