const drawPlayer = require("../utils/player");

function animate(gd) {
  if (gd.ballx + gd.radius >= gd.width || gd.ballx - gd.radius <= 0) {gd.dx *= -1; gd.direction *=-1;/*console.log('merde, leaving');gd.setScore();return;*/}
  gd.ctx.clearRect(0, 0, gd.width, gd.height);
  if (gd.bally + gd.radius >= gd.height || gd.bally - gd.radius <= 0) gd.dy *= -1;
  gd.ballx += gd.dx;
  gd.bally += gd.dy;
  drawPlayer.drawPlayer(gd);
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
