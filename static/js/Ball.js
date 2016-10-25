function Ball (x,y){
  this.x = x;
  this.y = y;
}

Ball.prototype.render = function (ctx){
  ctx.beginPath();
  ctx.arc(this.x, this.y, 10, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
