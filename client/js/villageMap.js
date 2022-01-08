import { connects } from "./client.js";
import { controlers, movespeed, jumpspeed } from "./controls.js";
import { fences } from "./fence.js";
import { chatOriginalpos, movechat } from "./guicontrols.js";
import { house } from "./house.js";
import { display2 } from "./menu.js";
import { front_wall_animation, back_wall_animation, left_wall_animation, right_wall_animation, Wall } from "./outsidewalls.js";
import { clearScene } from "./resourceTracker.js";
import { stairs } from "./stairs.js";
import { stairs2 } from "./stairs2.js";
import { init, renderer, controls } from "./three.js";




function map1() {
  clearScene();
  //canceling the animation on the collision
  // cancelAnimationFrame(collision);
  //clearing the animation frame on the walls
  cancelAnimationFrame(front_wall_animation);
  cancelAnimationFrame(back_wall_animation);
  cancelAnimationFrame(left_wall_animation);
  cancelAnimationFrame(right_wall_animation);

  document.body.removeChild(renderer.domElement);

  loadMap1();
}

function loadMap1() {
  init();
  movespeed.value = 0.4;
  jumpspeed.value = 1;
  controlers();
  Wall();
  fences();
  house();
  stairs();
  stairs2();
  connects();
  // animatingIfThereIscollision();

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
  map1
}