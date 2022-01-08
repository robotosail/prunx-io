import {GLTFLoader} from "../library/loaders/GLTFLoader.js";
import {scene} from "./three.js";

const glbloader = new GLTFLoader();

glbloader.load(
  "image/semi/smg3.glb",
  function (glb) {
    //  <<--------- Model Path
    const root = glb.scene;
    root.castShadow = true;
    scene.add(root)

    root.position.set(0, -5, 0);
    // light.position.set(root.position.x, -100, root.position.z);
    root.rotation.z = 10.8;
    

    function gun(){
      requestAnimationFrame(gun);
        //allows the gun to move with the camera
         
    // root.position.set(camera.position.x, -4, camera.position.z);
              root.scale.y = -200;
              root.scale.z = -200;
              root.scale.x = -200;
} 
gun()
  },
  // called while loading is progressing
  function (xhr) {
    console.log( (xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  (error) => {
    console.log("An error happened " + error);
  }
);
