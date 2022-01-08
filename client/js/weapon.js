// "use strict";
import * as THREE from "../library/three.module.js";
import {camera, scene} from "./three.js"
import {otherPlayer} from "./player.js";
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

let otherBullets = [],
  otherBulletsId = [];

let createBullet = function (data) {
  let bullet_geometry = new THREE.BoxGeometry(
    data.bulletsizeX,
    data.bulletsizeY,
    data.bulletsizeZ
  );
  let bullet_material = new THREE.MeshBasicMaterial({
    color: "purple"
  });
  bullet = new THREE.Mesh(bullet_geometry, bullet_material);

  bulletData = data;

  bullet.rotation.set(0, 0, 0);
  bullet.position.x = data.bulletx;
  bullet.position.y = data.bullety;
  bullet.position.z = data.bulletz;

  bulletId = data.bulletId;
  // movSpeed = data.speed;
  // tunSpeed = data.turnSpeed;

  updateCameraPosition2();

  bullets.push(bullet);
  scene.add(bullet);
};

let updateCameraPosition2 = function () {
  bullet.position.x = camera.position.x;
  bullet.position.y = camera.position.y;
  bullet.position.z = camera.position.z - 10;

  // when the bullet rotates
  bullet.rotation.x = camera.rotation.x;
  bullet.rotation.y = camera.rotation.y;
  bullet.rotation.z = camera.rotation.z;
};

let updateBulletPosition = function (data) {
  let someBullet = bulletForId(data.bulletId);

  someBullet.position.x = data.bulletx;
  someBullet.position.y = data.bullety;
  someBullet.position.z = data.bulletz;

  someBullet.rotation.x = data.bulletr_x;
  someBullet.rotation.y = data.bulletr_y;
  someBullet.rotation.z = data.bulletr_z;
};

let updateBulletData = function () {
  bulletData.bulletx = bullet.position.x;
  bulletData.bullety = bullet.position.y;
  bulletData.bulletz = bullet.position.z;

  bulletData.bulletr_x = bullet.rotation.x;
  bulletData.bulletr_y = bullet.rotation.y;
  bulletData.bulletr_z = bullet.rotation.z;
};

let addOtherBullet = function (data) {
  let cube_geometry2 = new THREE.BoxGeometry(
    data.bulletsizeX,
    data.bulletsizeY,
    data.bulletsizeZ
  );
  let cube_material2 = new THREE.MeshBasicMaterial({
    color: "blue"
  });
  otherBullet = new THREE.Mesh(cube_geometry2, cube_material2);

  otherBullet.position.x = data.bulletx;
  otherBullet.position.y = data.bullety;
  otherBullet.position.z = data.bulletz;

  otherBulletsId.push(data.bulletId);
  otherBullets.push(otherBullet);
  scene.add(otherBullet);
};

let removeOtherBullet = function (data) {
  scene.remove(bulletForId(data.bulletId));
};

let bulletForId = function (id) {
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
window.addEventListener("mousedown", shoot);
window.addEventListener("mouseup", shoot2);

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
      scene.remove(bullet, otherBullet);
      //updating the bullet position
      updateBulletData();
      sock.emit("updateBulletPosition", bulletData);
    }, 1000);
    //pushing the bullet to the array.
    // bullets.push(bullet);
    scene.add(bullet);
  }
}

function killing(a, d) {
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
  sock.emit("playerKilled", clientId);
  // let answer = otherPlayers.indexOf(playerId);
  // alert(answer);
}
let inte = setInterval(checkBulletState, 100);

let bulletspeed = 3;
function bulletAnimation(bulles) {
  requestAnimationFrame(bulletAnimation);
  if (bulles) {
    let delta = 1;

    // killing(otherPlayer, bullet);
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