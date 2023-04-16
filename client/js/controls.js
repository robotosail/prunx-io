//"use strict";
import {camera, controls, groundBody} from "./three.js";
import {moveSpeed, playerBody, updatePlayerData, playerData, updateCameraPosition} from "./player.js";
import {scope} from "./scope.js";
import {sock} from "./client.js";

let moveForward = {value:false};
let moveBackward = {value:false};
let moveLeft = {value:false};
let moveRight = {value:false};
let jump = { value: false };
let canJump = true;
let onGround = false;
let movespeed = {value: 1};
let crouch = false;
let jumpspeed = {value:10};
let jumpHeight = { value: 20 };

let friction = 0.99;

let w = "w";
let a = "a";
let d = "d";
let s = "s";
let up = "ArrowUp";
let down = "ArrowDown";
let left = "ArrowLeft";
let right = "ArrowRight";
let shift = "Shift";
let space = " ";

// // creates a function for movement
let btn = document.getElementById("button");

let controlers = function () {
  btn.addEventListener("click", () => {
    controls.lock();
    controler();
  });

  function controler() {

    const move = function (e) {
      // alert(e.key);
      //checks if the input box is being focused
      if(e.target.matches("input")){

        return;
      }
      else if (e.shiftKey) {
        e.preventDefault();
        console.log("Shift pressed")
        return;
      }
      else{
        switch (e.key) {
        case w: // w
        case up: // up
          moveForward.value = true;
          break;
        case a: // a
        case left: // left
          moveLeft.value = true;
          break;
        case s: // s
        case down: // back
          moveBackward.value = true;
          break;
        case d: // d
        case right: // right
          moveRight.value = true;
          break;
        case shift: //shift
          crouch = true;
          break;
        case space: // space
            // canJump = false;
            if (onGround == true) {
              playerBody.velocity.y = -jumpHeight.value;
              // onGround = false;
              
            }
            else {
              return;
            }
          break;
        default:
          break;
      }
    }
    };

    const move2 = function (e) {
      switch (e.key) {
        case w: // w
        case up: // up
          moveForward.value = false;
          break;
        case a: // a
        case left: // left
          moveLeft.value = false;
          break;
        case s: // s
        case down: // back
          moveBackward.value = false;
          break;
        case d: // d
        case right: // right
          moveRight.value = false;
          break;
        // case space: // space
        //   jump.value = false;
        //   break;
        case shift: // shift
          crouch = false;
          break;
        default:
          break;
      }
    };
    function checkKeyStates() {

      if (moveForward.value) {
        controls.moveForward(movespeed.value);
        // updatePlayerData();
        // sock.emit("updatePosition", playerData);

      }
      if (moveBackward.value) {
        controls.moveForward(-movespeed.value);
        // updatePlayerData();
        // sock.emit("updatePosition", playerData);
      }
      if (moveRight.value) {
        controls.moveRight(-movespeed.value);
        // updatePlayerData();
        // sock.emit("updatePosition", playerData);
      }
      if (moveLeft.value) {
        controls.moveRight(movespeed.value);
        // updatePlayerData();
        // sock.emit("updatePosition", playerData);
      }
      if (playerBody.position.y >= -3) {
        onGround = true;
        // updatePlayerData();
        // sock.emit("updatePosition", playerData);
      }

      // updating the players position on the server side
        updatePlayerData();
        sock.emit("updatePosition", playerData);
      // //the crouch
      // if (crouch && playerBody.velocity.y <= -3) {
      //   playerBody.velocity.y += jumpspeed.value;
      //   updatePlayerData();
      //   sock.emit("updatePosition", playerData);
      // }
      // //stop crouching
      // else if (crouch === false && playerBody.velocity.y >= -6) {
      //   playerBody.velocity.y -= jumpspeed.value;
      //   updatePlayerData();
      //   sock.emit("updatePosition", playerData);
      // }
      
      // updating the players position on the server
      
    }

    function animatePlayer(data) {
      requestAnimationFrame(animatePlayer);
      if (playerBody) {
        updateCameraPosition();

        checkKeyStates();
        playerBody.position.set(
          camera.position.x,
          camera.position.y,
          camera.position.z
        );
        
      }
    }
    animatePlayer();

    // event listener for jumping
    window.addEventListener("keypress", function (e) {
      if (e.key === " ") {
        jump.value = true;
      }
    });
    window.addEventListener("keydown", move, false);
    window.addEventListener("keyup", move2, false);
  }
};
controlers();
// to make the ui and other stuff disappear when clicked
controls.addEventListener("lock", function () {
  btn.style.display = "none";
  movespeed.value = moveSpeed;
  jumpspeed.value = 1;
});

controls.addEventListener("unlock", function () {
  btn.style.display = "block";
  movespeed.value = 0;
  jumpspeed.value = 0;
  scope.style.display = "none";
});

//allowing uses to customize controls
function customization() {
  const key_press1 = document.getElementById("k-1");
  const key_press2 = document.getElementById("k-2");
  const key_press3 = document.getElementById("k-3");
  const key_press4 = document.getElementById("k-4");
  const key_press5 = document.getElementById("k-5");
  const key_press6 = document.getElementById("k-6");

  const kp1 = document.getElementById("kp-1");
  const kp2 = document.getElementById("kp-2");
  const kp3 = document.getElementById("kp-3");
  const kp4 = document.getElementById("kp-4");
  const kp5 = document.getElementById("kp-5");
  const kp6 = document.getElementById("kp-6");

  function custom1(e) {
    const status = e.key;
    w = e.key;
    kp1.innerHTML = status;
    // if the key the user press is space instead of the html being blank set it to space
    if (e.key === " ") {
      kp1.innerHTML = "space";
    }
    console.log(w);
  }

  function custom2(e) {
    const status = e.key;
    s = e.key;
    kp2.innerHTML = status;
    // if the key the user press is space instead of the html being blank set it to space
    if (e.key === " ") {
      kp2.innerHTML = "space";
    }
    console.log(s);
  }

  function custom3(e) {
    const status = e.key;
    a = e.key;
    kp3.innerHTML = status;
    // if the key the user press is space instead of the html being blank set it to space
    if (e.key === " ") {
      kp3.innerHTML = "space";
    }
    console.log(a);
  }

  function custom4(e) {
    const status = e.key;
    d = e.key;
    kp4.innerHTML = status;
    // if the key the user press is space instead of the html being blank set it to space
    if (e.key === " ") {
      kp4.innerHTML = "space";
    }
    console.log(d);
  }

  function custom5(e) {
    const status = e.key;
    space = e.key;
    kp5.innerHTML = status;
    // if the key the user press is space instead of the html being blank set it to space
    if (e.key === " ") {
      kp5.innerHTML = "space";
    }
    console.log(space);
  }

  function custom6(e) {
    const status = e.key;
    shift = e.key;
    kp6.innerHTML = status;
    // if the key the user press is space instead of the html being blank set it to space
    if (e.key === " ") {
      kp6.innerHTML = "space";
    }
    console.log(shift);
  }

  key_press1.addEventListener("keydown", custom1);
  key_press2.addEventListener("keydown", custom2);
  key_press3.addEventListener("keydown", custom3);
  key_press4.addEventListener("keydown", custom4);
  key_press5.addEventListener("keydown", custom5);
  key_press6.addEventListener("keydown", custom6);
}
customization();

export{
  movespeed,
  jumpspeed,
  jumpHeight,
  controlers,
  jump,
  moveForward,
  moveBackward,
  moveLeft,
  moveRight
}
