import * as THREE from "../library/three.module.js";
import { PointerLockControls } from "../library/controls/PointerLockControls.js";

let scene, world, camera, controls, renderer, collideObject, groundBody, floor = {value: null}, collision;
collideObject = [];
let jumpableObject = [];
let CANNON = window.CANNON;
const groundMat = new CANNON.Material("groundMaterial");
  
collideObject.receiveShadow = true;
collideObject.castShadow = true;

function cannonInit(){
  world = new CANNON.World();
  world.gravity.set(0,27, 0); //setting the gravity of the world
  world.broadphase = new CANNON.NaiveBroadphase();  //Detect coilliding objects
  world.solver.iterations = 10; // collision detection sampling rate
}
cannonInit();

function init() {
  scene = new THREE.Scene();

  //	the camera
  camera = new THREE.PerspectiveCamera(
    200,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.y = -3
  // camera.position.z =
  //   Math.floor(Math.random() * -347) + 1 ||
  //   Math.floor(Math.random() * 338) + 1 ||
  //   Math.floor(Math.random() * -345) + 1 ||
  //   Math.floor(Math.random() * 340) + 1;
  // camera.position.x =
  //   Math.floor(Math.random() * -344) + 1 ||
  //   Math.floor(Math.random() * 344) + 1 ||
  //   Math.floor(Math.random() * -331) + 1 ||
  //   Math.floor(Math.random() * 345) + 2;
  // camera.position.y = -4;
  //the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // sets the color of the renederer
  renderer.setClearColor("skyblue");
  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  document.body.appendChild(renderer.domElement);

  //pointer lock controls for camera
  controls = new PointerLockControls(camera, renderer.domElement);
  let clock = new THREE.Clock();

  let btn = document.getElementById("button");

  btn.addEventListener("click", () => {
    controls.lock();
  });
  // to make the ui and other stuff disappear when clicked
  controls.addEventListener("lock", function () {
    btn.style.display = "none";
  });

  controls.addEventListener("unlock", function () {
    btn.style.display = "block";
  });
  //  event listner for change
  controls.addEventListener("change", render);

  /// ------------------\\\
  //this makes the floor
  const groundShape = new CANNON.Plane();
  // const groundMatcm = new CANNON.ContactMaterial(groundMat, groundMat, {friction:0, restitution: 1,
  //   contactEquationStiffness: 1e8,
  //   contactEquationRelaxation: 3,
  //   frictionEquationStiffness: 1e8,
  //   frictionEquationRegularizationTime: 3});
  groundMat.friction = 1;

  groundBody = new CANNON.Body({
    mass: 0, // mass == 0 makes the body static
    material: groundMat
});

  groundBody.addShape(groundShape);
//adds the floor to the physics world
world.addBody(groundBody);
// world.addContactMaterial(groundMatcm)
groundBody.position.y = 0;  

  floor.value = new THREE.Mesh(
    new THREE.PlaneGeometry(700, 700, 50, 50, 50),
    new THREE.MeshPhongMaterial({ color: 0x808080 })
  );
  // 0x808080
  //makes the floor spin
  // groundBody.angularVelocity.set(Math.PI / 2, 0, 0)
  floor.value.rotation.x = Math.PI / 2;
  //make the floor show shadow
  floor.value.receiveShadow = true;
  scene.add(floor.value);
  collideObject.push(floor.value);
// ------------- \\


  //light
  let ambientlight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientlight);

  // //makes the light shine
  // 0xffffff
  let light = new THREE.PointLight("skyblue", 0.15, 1000);
  light.position.set(0, -100, 50);

  //to make it cast shadow
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 50;
  scene.add(light);

  animate();
}
init();

function updatePhysics(){
  // Step the physics world
  world.step(1/60);
  floor.value.position.copy(groundBody.position);
  groundBody.quaternion.copy(floor.value.quaternion);
}

// animate function
function animate() {
  requestAnimationFrame(animate);
  updatePhysics()
  render();
}

//when window is resized
window.addEventListener("resize", windowresize, false);
//when window is resized
function windowresize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

//rendering the game
function render() {
  renderer.render(scene, camera);
}

// // the fps
// let fps2 = new Stats();
// //displays the stats
// fps2.domElement.style.position = "absolute";
// fps2.domElement.style.left = "92%";
// fps2.domElement.style.top = "5%";
// fps2.domElement.style.opacity = "100%";
// document.body.appendChild(fps2.domElement);

// //animate function
// requestAnimationFrame(function loop() {
//   fps2.update();
//   requestAnimationFrame(loop);
// });

const fps = {
  startTime: 0,
  frameNumber: 0,
  getFPS: function () {
    this.frameNumber++;
    const d = performance.now(),
      currentTime = (d - this.startTime) / 1000,
      result = Math.floor(this.frameNumber / currentTime);
    if (currentTime > 1) {
      this.startTime = performance.now();
      this.frameNumber = 0;
    }
    return result;
  }
};
const f = document.querySelector("#fps");
function fpsLoop() {
  setTimeout(fpsLoop, 1000 / 60);
  f.innerHTML = fps.getFPS();
}

fpsLoop();


export{
  scene, 
  world,
  camera,
  controls, 
  renderer, 
  collideObject, 
  floor,
  collision,
  jumpableObject,
  init,
  THREE,
  CANNON,
  groundMat, 
  groundBody
}