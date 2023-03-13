//"use strict";
import { wallmaterial } from "./house.js";
import { otherPlayerBody } from "./player.js";
import {THREE, scene, collideObject, camera, CANNON, world} from "./three.js"

//@Author: robotosail
// the wall texture
let wallTexture = new THREE.TextureLoader().load("image/wall2.jpg");
let front_wall_animation, left_wall_animation, right_wall_animation, back_wall_animation;
const wallspeed = 1;
const mass = 0;
const wallsBody = [], wallsMesh = [];

function Wall(){

// the front wall
function front(){
const leftwallShape = new CANNON.Box(new CANNON.Vec3(706/2, 100/2, 1/2));
let frontwallBody = new CANNON.Body({mass: mass, material: wallmaterial});
frontwallBody.addShape(leftwallShape);

let frontwall = new THREE.Mesh(new THREE.BoxGeometry(706,100,1), new THREE.MeshBasicMaterial({color:"brown", map:wallTexture}));

scene.add(frontwall);
world.add(frontwallBody);
wallsMesh.push(frontwall);
wallsBody.push(frontwallBody);

frontwallBody.position.x = 3;
frontwallBody.position.y = -50;
frontwallBody.position.z = -350;

}
front();


function left(){
  const leftwallShape = new CANNON.Box(new CANNON.Vec3(1/2, 100/2, 700/2));
  let leftwallBody = new CANNON.Body({mass: mass, material: wallmaterial});
  leftwallBody.addShape(leftwallShape);

  let leftwall = new THREE.Mesh(new THREE.BoxGeometry(1,100,700), new THREE.MeshBasicMaterial({color:"brown", map:wallTexture}));

scene.add(leftwall);
world.add(leftwallBody);
collideObject.push(leftwallBody);
wallsMesh.push(leftwall);
wallsBody.push(leftwallBody);

leftwallBody.position.x = 350;
leftwallBody.position.y = -50;
leftwallBody.position.z = -1;

}
left();

//back wall
function back(){
  const backwallShape = new CANNON.Box(new CANNON.Vec3(703/2,100/2,1/2));
  let backwallBody = new CANNON.Body({mass: mass, material: wallmaterial});
  backwallBody.addShape(backwallShape);

  let backwall = new THREE.Mesh(new THREE.BoxGeometry(703,100,1), new THREE.MeshBasicMaterial({color:"brown", map:wallTexture}));

scene.add(backwall);
world.add(backwallBody);
wallsMesh.push(backwall);
wallsBody.push(backwallBody);
collideObject.push(backwall);

backwallBody.position.x = 1;
backwallBody.position.y = -50;
backwallBody.position.z = 350;

}
back();


// the right wall

function right(){
  const rightwallShape = new CANNON.Box(new CANNON.Vec3(1/2, 100/2, 700/2));
  let rightwallBody = new CANNON.Body({mass: mass, material: wallmaterial});
  rightwallBody.addShape(rightwallShape);

  let rightwall = new THREE.Mesh(new THREE.BoxGeometry(1,100,700), new THREE.MeshBasicMaterial({color:"brown", map:wallTexture}));

scene.add(rightwall);
world.add(rightwallBody)
collideObject.push(rightwall);


rightwallBody.position.x = -350;
rightwallBody.position.y = -50;
rightwallBody.position.z = -0.5;
wallsMesh.push(rightwall);
wallsBody.push(rightwallBody);

}
right();
animate()
}
Wall();


function animate(){
requestAnimationFrame(animate);
for(let i = 0; i<wallsBody.length; i++){
  wallsMesh[i].position.copy(wallsBody[i].position);
  }
}


export{
  front_wall_animation, 
  left_wall_animation, 
  right_wall_animation, 
  back_wall_animation,
  Wall
}