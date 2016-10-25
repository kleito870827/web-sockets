// npm install --save express socket.io
// npm install -save-dev nodemon
const express = require('express');
const PORT = 3007;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ServerBall = require('./ServerBall.js');
const connection_timeuot = 10000;
const players = {};
var ball = undefined;

app.use(express.static('static'));

io.on('connection', function(socket){
  console.log("NEW PlAYER CONNECTED: ");
  console.log(socket.id);
  var playerCount = 0;
  for (var socketId in players){
    if (new Date().getTime() - players[socketId].lastMove > connection_timeuot){
      delete players[socketId];
    }else{
      playerCount++;
    }
  }
  if(playerCount < 2){
    players[socket.id] = {x: 300, y: 100, lastMove: new Date().getTime()};
    socket.on("player_moved", function(data){
      players[socket.id] = data;
      socket.broadcast.emit("player_moved", players);
    });
    io.sockets.emit("player_joined", {id: socket.id, role: 'player', players: players });
    if(playerCount === 1) setInterval(createOrUpdateBall, 100);
  }
  else{
    io.sockets.emit('player_joined', {
      id: socket.id,
      role: "spectator",
      players: players
    });
  }
  socket.on("disconnect", function(){
    if(players[socket.id])
    delete players[socket.id];
  });
  });

function createOrUpdateBall(){
  if(!ball){
    ball = new ServerBall();
  }else{
    ball.update(players);
  }
  io.sockets.emit("ball_update", ball);
}


app.get('/', function(req, res) {
    res.sendFile(__dirname + "/static/index.html");
});

http.listen(PORT, () => console.log("Server Listening on port " + PORT));
