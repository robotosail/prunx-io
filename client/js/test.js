import {camera, THREE, scene} from "./three.js"


let world, CANNON, stack, lastTime = 0;
const boxHeight = 1; // Height of each layer
const originalBoxSize = 3; // Original width and height of a box

CANNON = window.CANNON;

function initCannon(){
  world = new CANNON.World();
  world.gravity.set(0, -10, 0); // Gravity pulls things down
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 40;
  
  function generateBox(x, y, z, width, depth, falls) {
    // ThreeJS
    const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
    const color = new THREE.Color("green");
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
  
    // CannonJS
    const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
    );
    let mass = falls ? 5 : 0; // If it shouldn't fall then setting the mass to zero will keep it stationary
    mass *= width / originalBoxSize; // Reduce mass proportionately by size
    mass *= depth / originalBoxSize; // Reduce mass proportionately by size
    const body = new CANNON.Body({ mass, shape });
    body.position.set(x, y, z);
    world.addBody(body);
  
    return {
      threejs: mesh,
      cannonjs: body,
      width,
      depth
    };
  }
generateBox(0, -10, 0, 100, 100, 0)
  }
// initCannon();

function animate(time){
  requestAnimationFrame(animate);
  const timePassed = time - lastTime;
  updatePhysics(timePassed)
  lastTime = time
}

function updatePhysics(timePassed){
  world.step(timePassed / 1000); // Step the physics world

}
// animate()