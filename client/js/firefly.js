import * as THREE from "../library/three.module.js";
import {renderer, scene, init, floor, controls} from "./three.js";
import {front_wall_animation, back_wall_animation, left_wall_animation, right_wall_animation} from "./outsidewalls.js";
import {movespeed, controlers} from "./controls.js";
import {clearScene} from "./resourceTracker.js";
import {wallMap2, building2, stairsMap2} from "./fireflymap.js";
import { connects } from "./client.js";
import { display2 } from "./menu.js";
import { chatOriginalpos, movechat } from "./guicontrols.js";

function map2(e) {
  //removing the renderer from the html
  //or deleting the renderer
  //clearing the renderer

  clearScene();
  //canceling the animation on the collision
  // cancelAnimationFrame(collision);
  //clearing the animation frame on the walls
  cancelAnimationFrame(front_wall_animation);
  cancelAnimationFrame(back_wall_animation);
  cancelAnimationFrame(left_wall_animation);
  cancelAnimationFrame(right_wall_animation);

  //disposing the renderer
  renderer.dispose();
  document.body.removeChild(renderer.domElement);

  //loading the new map
  loadmap2();
}

function loadmap2() {
  init();
  scene.remove(floor.value);
  renderer.setClearColor(0x7f8199);
  floor.value = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000, 50, 50, 50),
    new THREE.MeshPhongMaterial({ color: 0x808080, wireframe: false })
  );
  floor.value.rotation.x += Math.PI / 2;
  scene.add(floor.value);
  movespeed.value = 0.4;
  controlers();
  wallMap2();
  building2();
  connects();
  stairsMap2();

  // variables for the display
  const weapondisplay = document.getElementById("weapon-ui");
  const weapon_display = document.getElementById("weapon-button");
  const display = document.getElementById("display1");
  const ui = document.getElementById("Ui");
  const controlpanel = document.getElementById("controlspanel");

  // to make the ui disappear
  controls.addEventListener("unlock", function () {
    ui.style.display = "block";
    weapon_display.style.display = "block";
    weapondisplay.style.display = "none";
  });

  // to make the ui and other stuff disappear when clicked
  controls.addEventListener("lock", function () {
    ui.style.display = "none";
    display.style.display = "none";
    display2.style.display = "none";
    weapon_display.style.display = "none";
    controlpanel.style.display = "none";
  });

  controls.addEventListener("lock", movechat);
  controls.addEventListener("unlock", chatOriginalpos);
}

export{
  map2
}