// "use strict";
import * as THREE from "../library/three.module.js";
import {camera, controls, scene} from "./three.js"
import {otherPlayer, playerForId, otherPlayersId, playerId} from "./player.js"
import {sock, clientId} from "./client.js";

let leftclick = false;
let emitter = new THREE.Object3D();
emitter.position.set(-0.1, -0.5, -1.5);
camera.add(emitter);

let bullet,
  otherBullet,
  bulletId,
  movSpeed,
  tunSpeed,
  bullets = [];

let bulletData;

const otherBullets = [],
  otherBulletsId = [];

/**
 * creates a new bullet
 * @param {*} data 
 */
function createBullet (data) {
  bulletData = data;
  const bullet_geometry = new THREE.BoxGeometry(
    bulletData.bulletsizeX,
    bulletData.bulletsizeY,
    bulletData.bulletsizeZ
  );
  const bullet_material = new THREE.MeshBasicMaterial({
    color: "purple"
  });
  bullet = new THREE.Mesh(bullet_geometry, bullet_material);

  bullet.rotation.set(0, 0, 0);
  bullet.position.x = bulletData.bulletx;
  bullet.position.y = bulletData.bullety;
  bullet.position.z = bulletData.bulletz;

  bulletId = bulletData.bulletId;
  // movSpeed = data.speed;
  // tunSpeed = data.turnSpeed;

  updateCameraPosition2();

  bullets.push(bullet);
  scene.add(bullet);
};

/**
 * updates the bullets position
 * @param {*} data 
 */
function updateCameraPosition2 () {
  bullet.position.x = camera.position.x;
  bullet.position.y = camera.position.y;
  bullet.position.z = camera.position.z - 10;

  // when the bullet rotates
  bullet.rotation.x = camera.rotation.x;
  bullet.rotation.y = camera.rotation.y;
  bullet.rotation.z = camera.rotation.z;
};

/**
 * updates the players bullet
 * @param {*} data the bullets info
 */
function updateBulletPosition (data) {
  const someBullet = bulletForId(data.bulletId);

  someBullet.position.x = data.bulletx;
  someBullet.position.y = data.bullety;
  someBullet.position.z = data.bulletz;

  someBullet.rotation.x = data.bulletr_x;
  someBullet.rotation.y = data.bulletr_y;
  someBullet.rotation.z = data.bulletr_z;
};

/**
 * updates the player's bullet on the server
 * @param {*} data 
 */
function updateBulletData () {
  bulletData.bulletx = bullet.position.x;
  bulletData.bullety = bullet.position.y;
  bulletData.bulletz = bullet.position.z;

  bulletData.bulletr_x = bullet.rotation.x;
  bulletData.bulletr_y = bullet.rotation.y;
  bulletData.bulletr_z = bullet.rotation.z;
};

/**
 * adding the other player's bullet
 * @param {*} data 
 */
function addOtherBullet (data) {
  const cube_geometry2 = new THREE.BoxGeometry(
    bulletData.bulletsizeX,
    bulletData.bulletsizeY,
    bulletData.bulletsizeZ
  );
  const cube_material2 = new THREE.MeshBasicMaterial({
    color: "blue"
  });
  otherBullet = new THREE.Mesh(cube_geometry2, cube_material2);

  otherBullet.position.x = bulletData.bulletx;
  otherBullet.position.y = bulletData.bullety;
  otherBullet.position.z = bulletData.bulletz;

  otherBulletsId.push(data.bulletId);
  otherBullets.push(otherBullet);
  scene.add(bulletForId(data.bulletId));

};

/**
 * remove the bullet when player leaves
 * @param {*} data 
 */
function removeOtherBullet (data) {
  scene.remove(bulletForId(data.bulletId));
};

/**
 * gets the bullets id using the giving id
 * @param {*} id bullets id
 * @returns returns the bullet that partains to the id
 */
function bulletForId (id) {
  let index;
  for (let i = 0; i < otherBulletsId.length; i++) {
    if (otherBulletsId[i] === id) {
      index = i;
      break;
    }
  }
  return otherBullets[index];
};

function shoot(e) {
  switch (e.button) {
    case 0:
      leftclick = true;
      break;
    default:
      break
  }
}
function shoot2(e) {
  switch (e.button) {
    case 0:
      leftclick = false;
      break;
    default:
      break;
  }
}

controls.addEventListener("lock", function () {
  
  window.addEventListener("mousedown", shoot);
  window.addEventListener("mouseup", shoot2);
});

// controls.addEventListener("unlock", function () {
//   window.removeEventListener("mousedown", shoot);
//   window.removeEventListener("mouseup", shoot2);
// })
function checkBulletState() {
  for (let i = 0; i < bullets.length; i += 1) {
    if (bullets[i] === undefined) continue;
    if (bullets[i].alive === false) {
      bullets.splice(i, 1);
      continue;
    }
  }

  if (leftclick) {
    //setting the position for the bullet
    bullet.quaternion.copy(camera.quaternion); // apply camera's quaternion
    bullet.position.setFromMatrixPosition(emitter.matrixWorld); //make it start at the tip of the weapon
    //removing the bullet every 1sec
    setTimeout(function () {
      // bullet.alive = false;
      scene.remove(bulletForId(bulletData.id));
      //updating the bullet position
      updateBulletData();
      sock.emit("updateBulletPosition", bulletData);
    }, 1500);
    //pushing the bullet to the array.
    // bullets.push(bullet);
    scene.add(bullet);
    // scene.add(bullet);
  }
}

function killing(a, d) {

  if (a.alive == true) { // make sure the player being shot at is still alive
    
    let b1 = a.position.y - a.geometry.parameters.height / 2;
    let t1 = a.position.y + a.geometry.parameters.height / 2;
    let r1 = a.position.x + a.geometry.parameters.width / 2;
    let l1 = a.position.x - a.geometry.parameters.width / 2;
    let f1 = a.position.z - a.geometry.parameters.depth / 2;
    let B1 = a.position.z + a.geometry.parameters.depth / 2;
    let b2 = d.position.y - d.geometry.parameters.height / 2;
    let t2 = d.position.y + d.geometry.parameters.height / 2;
    let r2 = d.position.x + d.geometry.parameters.width / 2;
    let l2 = d.position.x - d.geometry.parameters.width / 2;
    let f2 = d.position.z - d.geometry.parameters.depth / 2;
    let B2 = d.position.z + d.geometry.parameters.depth / 2;
    if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
      return false;
    }
    
  // send to the server that a player has just been killed
    return sock.emit("playerKilled", a.name); //returning the id of the player that was just killed
  }
}
let inte = setInterval(checkBulletState, 100);

let bulletspeed = 3;
function bulletAnimation(bulles) {
  requestAnimationFrame(bulletAnimation);
  if (bulles) {
    let delta = 1;

    //// looping through the list of ids
    for (let i = 0; i < otherPlayersId.length; i++){
      const index = playerForId(otherPlayersId[i])
      /// for each each id in the list run it in the player id matching function
      // once there is a match run the collision with the current bullet
        killing(index, bullet);
    }

    // making a function for the bullet
    bullets.forEach((b) => {
      b.translateZ(-bulletspeed * delta); // move along the local z-axis
      updateBulletData();
      sock.emit("updateBulletPosition", bulletData);
    });
  }
}
bulletAnimation();


export{
  createBullet,
  otherBullet,
  bullet,
  addOtherBullet,
  removeOtherBullet,
  updateBulletData,
  updateBulletPosition,
  bullets,
  bulletspeed,
  emitter
}