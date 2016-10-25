function ServerBall(){
  this.x = 290;
  this.y = 190;
  this.velX = Math.random()*15+15;
  this.velY = Math.random()*15;
  this.velX = Math.random()<0.5?1:-1;
}

ServerBall.prototype.update = function( players){
  this.x += this.velX;
  this.y += this.velY;
  let collided = false;
  for(var pid in players){
    let p = players[pid];
    if(this.x > p.x && this.x < p.x+50 && this.y > p.y && this.y < p.y+150){
      collided = p;
    }
    if(this.x+20 > p.x && this.x+20 < p.x+50 && this.y+20 > p.y && this.y+20 < p.y+150){
      collided = p;
    }
  }
  if(collided){
    if(this.velX > 0){
      this.x = collided.x - 21;
    }else{
      this.x = collided.x + 51;
    }
    this.velX *= -1;
  }
  if(this.y < 0 || this.y + 20 > 400) this.velY *= -1;
  if(this.x < 0 || this.x + 20 > 600) this.velX *= -1;

}
module.exports = ServerBall;
