function Player(x,y, isRemote, socketId){
  this.x = x;
  this.y = y;
  this.velX = 0;
  this.velY = 0;
  this.isRemote = isRemote;
  this.socketId = socketId;
}
Player.prototype.update = function(){
  this.x += this.velX;
  this.y += this.velY;
  ioClient.emit("player_moved", {id: this.socketId, x: this.x, y: this.y, lastMoved: new Date().getTime()});
};

Player.prototype.render = function(){
  if(this.isRemote){
    ctx.save();
    ctx.strokeStyle = "#0000FF";
    ctx.strokeRect(this.x, this.y, 50, 150);
    ctx.restore();
  }else{
  ctx.strokeRect(this.x, this.y, 50, 150);
}
  if(this.x <= 0) this.x = 0;
  if(this.x >= 550) this.x = 550;
  if(this.y <= 0) this.y = 0;
  if(this.y >= 250) this.y = 250;

}

Player.prototype.initConstrol = function(speed){
  window.onkeydown = (e) => {
    if(e.keyCode === 37) this.velX = -speed;
    if(e.keyCode === 39) this.velX = speed;
    if(e.keyCode === 38) this.velY = -speed;
    if(e.keyCode === 40) this.velY = speed;
  }
  window.onkeyup = (e) => {
    if(e.keyCode === 37 && this.velX === -speed) this.velX = 0;
    if(e.keyCode === 39 && this.velX === speed) this.velX = 0;
    if(e.keyCode === 38 && this.velY === -speed) this.velY = 0;
    if(e.keyCode === 40 && this.velY === speed) this.velY = 0;
  }
}
