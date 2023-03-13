//"use strict";
// import { crateBody } from "./crates.js";
import {camera, scene, collideObject, THREE, CANNON, world, groundMat} from "./three.js";

let player, playerId, moveSpeed, turnSpeed, otherPlayer, otherPlayerBody;

let playerData, playerBody, playerHp = { value: 0 }, alive = {value:0};

const otherPlayers = [],
  otherPlayersId = [],
  otherPlayersId2 = [];
const slipperyMaterial = new CANNON.Material("slpperyMaterial");
const cm = new CANNON.ContactMaterial(slipperyMaterial, groundMat, { friction: 1.0, restitution: 0 });
world.addContactMaterial(cm)

/**
 * creates a new instance of player
 * @param {*} data players information
 */
function createPlayer(data) {
  playerData = data;
  // removing the friction
  const player_Shape = new CANNON.Box(new CANNON.Vec3(data.sizeX / 2, data.sizeY / 2, data.sizeZ / 2))
  playerBody = new CANNON.Body({mass: data.mass, shape: player_Shape, material: slipperyMaterial});
  playerBody.position.set(data.x, data.y, data.z)
  playerHp.value = data.hp;
  alive.value = data.alive;
  playerId = data.playerId;

  moveSpeed = data.speed;
  turnSpeed = data.turnSpeed;
  world.addBody(playerBody);
  updateCameraPosition();
};


/**
 * Updates the camera's position
 */
function updateCameraPosition() {

  camera.position.x = playerBody.position.x;
  camera.position.y = playerBody.position.y;
  camera.position.z = playerBody.position.z;
  // when the player rotates
  // playerBody.quaternion.copy(camera.quaternion);
  // console.log(playerBody)
};


/**
 * updates the otherplayers position
 * @param {*} data holds the player information
 */
function updatePlayerPosition(data) {
  const somePlayer = playerForId(data.playerId);

  somePlayer.position.x = data.x;
  somePlayer.position.y = data.y;
  somePlayer.position.z = data.z;
  somePlayer.hp = data.hp;
  somePlayer.alive = data.alive;
  // somePlayer.alive = alive.value;
  moveSpeed = data.speed;

  somePlayer.rotation.x = data.r_x;
  somePlayer.rotation.y = data.r_y;
  somePlayer.rotation.z = data.r_z;
};

/**
 * update the player's data on the server
 */
function updatePlayerData() {
  playerData.x = playerBody.position.x;
  playerData.y = playerBody.position.y;
  playerData.z = playerBody.position.z;
  playerData.hp = playerHp.value;
  playerData.alive = alive.value;
  
  playerData.r_x = camera.rotation.x;
  playerData.r_y = camera.rotation.y;
  playerData.r_z = camera.rotation.z;
};

/**
 * adding the otherplayer into the game so otherplayer can see them
 */
function addOtherPlayer(data) { // data = player info from the server
const otherPlayer_Shape = new CANNON.Box(new CANNON.Vec3(playerData.sizeX / 2, playerData.sizeY / 2, playerData.sizeZ / 2))
  otherPlayerBody = new CANNON.Body({ mass: playerData.mass, material: slipperyMaterial, shape: otherPlayer_Shape });

  const cube_geometry = new THREE.BoxGeometry(playerData.sizeX, playerData.sizeY, playerData.sizeZ);
  const cube_material = new THREE.MeshBasicMaterial({
    color: "green"
  });
  otherPlayer = new THREE.Mesh(cube_geometry, cube_material);
  otherPlayerBody.position.set(playerData.x, playerData.y, playerData.z);
  /// pushing the old player data into the list
  
  otherPlayer.name = data.playerId;
  otherPlayer.hp = data.hp;
  otherPlayer.alive = data.alive;
  otherPlayersId.push( otherPlayer.name);

  otherPlayers.push(otherPlayer);
  world.addBody(otherPlayerBody);
  scene.add(playerForId(otherPlayer.name));
  
  const playerHealth = document.createElement("div");
  playerHealth.style.width = otherPlayer.hp+"px";
  playerHealth.style.height = "20px";
  playerHealth.textContent = "test";
  playerHealth.style.position = "absolute"
  playerHealth.style.top = "10%"
  playerHealth.style.backgroundColor = "red";
  document.body.append(playerHealth)
  animate();
};

/**
 * removing the player from the server when they disconnect
 * @param {*} data player infromation 
 */
function removeOtherPlayer(data) {
  scene.remove(playerForId(data.playerId));
};

/**
 * loops through list of all the players and matches the player id with the giving id
 * @param {*} id wanted player id
 * @returns returns the player with the specific id
 */
function playerForId(id) {
  let index;
  for (let i = 0; i < otherPlayersId.length; i++) {
    if (otherPlayersId[i] === id) {
      index = i;
      break;
    }
  }
  if (otherPlayersId[index] !== id) {
    return `No player with the Id ${id} was found`
  }
  return otherPlayers[index];
};
 
function animate(){
  requestAnimationFrame(animate);
  // console.log(playerId)

  otherPlayer.position.copy(otherPlayerBody.position);
  otherPlayer.quaternion.copy(otherPlayerBody.quaternion);
}

export{
  player,
  moveSpeed,
  createPlayer,
  updatePlayerPosition,
  updatePlayerData,
  removeOtherPlayer,
  playerData,
  addOtherPlayer,
  otherPlayer,
  otherPlayersId,
  otherPlayersId2,
  updateCameraPosition,
  playerForId,
  playerBody,
  otherPlayerBody,
  playerId,
  playerHp,
  alive
}