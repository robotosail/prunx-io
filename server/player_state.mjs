// store all players
let players = [];
let player;
const size = 5

class Player {
  constructor() {
    this.playerId = players.length;
    this.x = 0; //Math.floor(Math.random() * 40) *-40;
    this.y = -4;
    this.z = 0; //Math.floor(Math.random() * 40) *-40;
    this.hp = 100;
    this.alive = true;
    //rotation
    this.r_x = 0;
    this.r_y = 0;
    this.r_z = 0;
    
    this.radius = size;
    this.mass = size;
    this.sizeX = size;
    this.sizeY = size;
    this.sizeZ = size;
    this.friction = 1;
    this.restitution = 0.3;
    this.speed = 0.3;
    this.turnSpeed = 0.03;
  }
}

//adding the player when they join
let addPlayer = function (id) {
  const player = new Player();
  player.playerId = id;
  players.push(player);

  return player;
};

//removing the player when they leave
function removePlayer(player) {
  const index = players.indexOf(player);

  if (index > -1) {
    players.splice(index, 1);
  }
};

function playerForId(id) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].playerId === id) {
      player = players[i];
      break;
    }
  }

  return player;
};

//updating the players position when moving
function updatePlayerData(data) {
  let player = playerForId(data.playerId);
  player.x = data.x;
  player.y = data.y;
  player.z = data.z;
  player.hp = data.hp;
  player.alive = data.alive;
  player.r_x = data.r_x;
  player.r_y = data.r_y;
  player.r_z = data.r_z;
  player.radius = data.radius;
  player.mass = data.mass
  player.friction = data.friction;
  player.speed = data.speed;
  player.sizeX = data.sizeX;
  player.sizeY = data.sizeY;
  player.sizeZ = data.sizeZ;
  player.restitution = data.restitution; 

  return player;
};

//exproting the function
// module.exports.players = players;
// module.exports.addPlayer = addPlayer;
// module.exports.removePlayer = removePlayer;
// module.exports.playerForId = playerForId;
// module.exports.updatePlayerData = updatePlayerData;

export default {
  players,
  addPlayer,
  removePlayer,
  playerForId,
  updatePlayerData
}