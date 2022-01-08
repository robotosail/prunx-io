//"use strict";
// import { crateBody } from "./crates.js";
import {camera, scene, collideObject, THREE, CANNON, world} from "./three.js";
// the players body
// let playerBody = new THREE.Mesh(
//   new THREE.BoxGeometry(3, 5, 3),
//   new THREE.MeshBasicMaterial({ color: 0x0ffff0 })
// );

// playerBody.receiveShadow = true;
// playerBody.castShadow = true;

// // position of the player
// function animation() {
//   requestAnimationFrame(animation);
//   playerBody.position.set(
//     camera.position.x,
//     camera.position.y + 1,
//     camera.position.z
//   );
// }
let player, playerId, moveSpeed, turnSpeed, otherPlayer, mass = 10, otherPlayerBody;

let playerData, playerBody;

let otherPlayers = [],
  otherPlayersId = [];
  const slipperyMaterial = new CANNON.Material("slpperyMaterial");
let createPlayer = function (data) {
  // removing the friction
  
  const cm = new CANNON.ContactMaterial(slipperyMaterial, "groundMaterial", {friction: 1.0, restitution: 0.3})
  const player_Shape = new CANNON.Box(new CANNON.Vec3(data.sizeX / 2, data.sizeY / 2, data.sizeZ / 2))
  playerBody = new CANNON.Body({mass: mass, shape: player_Shape, material: slipperyMaterial});

  let player_geometry = new THREE.BoxGeometry(
    data.sizeX,
    data.sizeY,
    data.sizeZ
  );
  let player_material = new THREE.MeshBasicMaterial({
    color: "blue"
  });
  player = new THREE.Mesh(player_geometry, player_material);

  playerData = data;

  playerBody.position.x = data.x;
  playerBody.position.y = data.y;
  playerBody.position.z = data.z;

  player.position.x = data.x;
  player.position.y = data.y;
  player.position.z = data.z;


  playerId = data.playerId;
  moveSpeed = data.speed;
  turnSpeed = data.turnSpeed;

  world.add(playerBody);
  world.addContactMaterial(cm)
  camera.add(player);
  
  
  updateCameraPosition();
};

let updateCameraPosition = function () {

  camera.position.x = playerBody.position.x;
  camera.position.y = playerBody.position.y;
  camera.position.z = playerBody.position.z;

  player.position.x = playerBody.position.x;
  player.position.y = playerBody.position.y;
  player.position.z = playerBody.position.z;

  // when the player rotates
  playerBody.quaternion.copy(camera.quaternion);

  player.rotation.x = camera.rotation.x;
  player.rotation.y = camera.rotation.y;
  player.rotation.z = camera.rotation.z;
};

let updatePlayerPosition = function (data) {
  let somePlayer = playerForId(data.playerId);

  somePlayer.position.x = data.x;
  somePlayer.position.y = data.y;
  somePlayer.position.z = data.z;

  somePlayer.rotation.x = data.r_x;
  somePlayer.rotation.y = data.r_y;
  somePlayer.rotation.z = data.r_z;
};

let updatePlayerData = function () {
  playerData.x = player.position.x;
  playerData.y = player.position.y;
  playerData.z = player.position.z;

  playerData.r_x = player.rotation.x;
  playerData.r_y = player.rotation.y;
  playerData.r_z = player.rotation.z;
};

let addOtherPlayer = function (data) {


const otherPlayer_Shape = new CANNON.Box(new CANNON.Vec3(data.sizeX / 2, data.sizeY / 2, data.sizeZ / 2))
otherPlayerBody = new CANNON.Body({mass: mass, material: slipperyMaterial});
otherPlayerBody.addShape(otherPlayer_Shape);

  let cube_geometry = new THREE.BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
  let cube_material = new THREE.MeshBasicMaterial({
    color: "green"
  });
  otherPlayer = new THREE.Mesh(cube_geometry, cube_material);
  otherPlayerBody.position.set(data.x, data.y, data.z);

  otherPlayersId.push(data.playerId);
  otherPlayers.push(otherPlayer);
  world.add(otherPlayerBody);
  scene.add(otherPlayer);
  collideObject.push(otherPlayer);

  
  animate(); 
};

let removeOtherPlayer = function (data) {
  scene.remove(playerForId(data.playerId));
};

let playerForId = function (id) {
  let index;
  for (let i = 0; i < otherPlayersId.length; i++) {
    if (otherPlayersId[i] === id) {
      index = i;
      break;
    }
  }
  return otherPlayers[index];
};

// the players legs
let leg1 = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0x8b4513 })
);

// the leg position
leg1.position.set(camera.position.x - 0.6, -5, camera.position.z);

camera.add(leg1);

leg1.receiveShadow = true;
leg1.castShadow = true;

// the players second legs
let leg2 = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0x8b4513 })
);

// the leg position
leg2.position.set(camera.position.x + 0.6, -5, camera.position.z);

camera.add(leg2);

// outline1
let outline = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0x00f })
);

// the leg position
outline.position.set(camera.position.x - 0.1, -5, camera.position.z);

camera.add(outline);

//outline2
let outline2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.2, 1),
  new THREE.MeshBasicMaterial({ color: 0x00f })
);

// the leg position
outline2.position.set(camera.position.x - 0.1, -7, camera.position.z);

camera.add(outline2);

// outline3
let outline3 = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 0.2, 1),
  new THREE.MeshBasicMaterial({ color: 0x00f })
);

// the leg position
outline3.position.set(camera.position.x - 0.001, -6, camera.position.z);

camera.add(outline3);

function animate(){
  requestAnimationFrame(animate);
  otherPlayer.position.copy(otherPlayerBody.position);
  otherPlayer.quaternion.copy(otherPlayerBody.quaternion);
  // var contactNormal = new CANNON.Vec3();
  // var upAxis = new CANNON.Vec3(0,1,0);
//   playerBody.addEventListener("collide", function(e){ 
//     var contact = e.contact;
//     // console.log("sphere collided");
//     // // playerBody.collisionResponse = 0; // no impact on other bodys
//     // console.log(contact)
//     if(contact.bi.id === playerBody.id)  // bi is the player body, flip the contact normal
//     contact.ni.negate(contactNormal);
// else
//     contactNormal.copy(contact.ni); // bi is something else. Keep the normal as it is

// // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
// if(contactNormal.dot(upAxis) > 0.5) // Use a "good" threshold value between 0 and 1 here!
//     canJump.value = true;
//    } );
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
  updateCameraPosition,
  playerBody,
  otherPlayerBody
}