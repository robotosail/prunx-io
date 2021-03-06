// store all players
let players = [];
let player;
function Player() {
  this.playerId = players.length;
  this.x = 0//Math.floor(Math.random() * 40) *-40;
  this.y = -7;
  this.z = 0//Math.floor(Math.random() * 40) *-40;
  this.r_x = 0;
  this.r_y = 0;
  this.r_z = 0;
  this.sizeX = 5;
  this.sizeY = 5;
  this.sizeZ = 5;
  this.speed = 0.6;
  this.turnSpeed = 0.03;
}

//adding the player when they join
let addPlayer = function (id) {
  let player = new Player();
  player.playerId = id;
  players.push(player);

  return player;
};

//removing the player when they leave
let removePlayer = function (player) {
  let index = players.indexOf(player);

  if (index > -1) {
    players.splice(index, 1);
  }
};

let playerForId = function (id) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].playerId === id) {
      player = players[i];
      break;
    }
  }

  return player;
};

//updating the players position when moving
let updatePlayerData = function (data) {
  let player = playerForId(data.playerId);
  player.x = data.x;
  player.y = data.y;
  player.z = data.z;
  player.r_x = data.r_x;
  player.r_y = data.r_y;
  player.r_z = data.r_z;

  return player;
};

//exproting the function
// module.exports.players = players;
// module.exports.addPlayer = addPlayer;
// module.exports.removePlayer = removePlayer;
// module.exports.playerForId = playerForId;
// module.exports.updatePlayerData = updatePlayerData;

export default{
  players,
  addPlayer,
  removePlayer,
  playerForId,
  updatePlayerData
}