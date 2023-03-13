//"use strict";
import {THREE, scene, collideObject, jumpableObject, CANNON, world, camera} from "./three.js";
import { BOX } from "./classes.js";
let crateBody, shape, crate, crates = [], bodies = [];
const slipperyMaterial = new CANNON.Material("slipperyMaterial");
// const friction = 0.3;
function box() {
  //creates the crate to be in random position
  
  for (let i = 0; i < 10; i++) {
    let z = Math.floor(Math.random() * 60) + 1;
    let x = Math.floor(Math.random() * 50) + 1;
    let y = Math.floor(Math.random() * -9) -8;
    let textures = new THREE.TextureLoader().load("image/crate.jpg");

    // slipperyMaterial.friction = friction;

    //the crates size divided by 2
    shape = new CANNON.Box(new CANNON.Vec3(7/2,7/2,7/2));
    // mass = -1;
    crateBody = new CANNON.Body({
      mass: 10, //setting the mass of the crateBody
      material: slipperyMaterial
    });

    // adding the shape to the body
    crateBody.addShape(shape);
    bodies.push(crateBody);

    //makes the box spin
    // crateBody.angularVelocity.set(0,0,0);
    world.addBody(crateBody);

    let b = new THREE.BoxGeometry(7, 7, 7);
    let c = new THREE.MeshPhongMaterial({ map: textures });
    crate = new THREE.Mesh(b, c);

    crateBody.position.set(x, y, z);
    crate.receiveShadow = true;
    crate.castShadow = true;
    

    scene.add(crate);
    collideObject.push(crate);
    jumpableObject.push(crate);
    crates.push(crate);
  }
}
box();

//updated the crates to be the same as in the physics world
function animate(){
  requestAnimationFrame(animate);
  //looping through the cratesbodies and making it the same as the crates
  for(let i=0; i<bodies.length; i++){
      crates[i].position.copy(bodies[i].position);
      crates[i].quaternion.copy(bodies[i].quaternion);
}
}
animate();



export{
  crateBody,
  slipperyMaterial
}