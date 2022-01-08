/* the fov*/
// necessary imports
import {camera, renderer, controls, scene, THREE} from "./three.js";
import {bullet, bullets, bulletspeed} from "./weapon.js";
import {rightclick, scope} from "./scope.js";
import {sock} from "./client.js";

const fps = document.getElementById("checkbox");
const resVal = document.getElementById("res");
const rangeVal = document.getElementById("range");
const UiSize = document.getElementById("UIsize");
const x = document.getElementsByClassName("x");
const scope_url = document.getElementById("scope-url");
const crossHair = document.getElementById("crosssize");


function rangeval() {
  document.getElementById("rangeValue").innerHTML = this.value;
  camera.scale.z = this.value;
}
rangeVal.addEventListener("input", rangeval)

/* if the mouse is moved the resolution is set to what it is*/
function res() {
  document.getElementById("resValue").innerHTML = this.value;
  renderer.setPixelRatio(this.value);
}
resVal.addEventListener("input", res)


/*toggle the fps bar*/
function showfps(checked) {
  const checkbox = document.getElementById("FPS_Main");
  if (checked === true) {
    checkbox.style.display = "flex";
    console.log("shown");
  } if(checked === false) {
    checkbox.style.display = "none";
    console.log("hide")
  }
}
fps.addEventListener("click", showfps);


/* to change the color of the ui*/
let colorWell;
const defaultColor = "#0000ff";

window.addEventListener("load", startup, false);

function startup() {
  colorWell = document.querySelector("#ui-color");
  colorWell.value = defaultColor;
  colorWell.addEventListener("input", updateFirst, false);
  colorWell.select();
}

function updateFirst(event) {
  const p = document.getElementById("display1");
  const q = document.getElementById("display2");
  const r = document.getElementById("weapon-ui");
  const d = document.getElementById("controlspanel");

  if (p) {
    p.style.background = event.target.value;
    q.style.background = event.target.value;
    r.style.background = event.target.value;
    d.style.background = event.target.value;
  }
}

/* to change the crosshair color*/
let crosshaircolor;

window.addEventListener("load", changecolor, false);

function changecolor() {
  crosshaircolor = document.querySelector("#cross-color");
  crosshaircolor.value = defaultColor;
  crosshaircolor.addEventListener("input", updatecolor, false);
  crosshaircolor.select();
}

let cross = document.getElementById("crosshair");
function updatecolor(event) {
  let crosstop = document.getElementById("top");
  let crossleft = document.getElementById("left");
  let crossright = document.getElementById("right");
  let crossbottom = document.getElementById("bottom");

  if (cross) {
    crosstop.style.background = event.target.value;
    crossleft.style.background = event.target.value;
    crossright.style.background = event.target.value;
    crossbottom.style.background = event.target.value;
  }
}
controls.addEventListener("unlock", function (e) {
  cross.style.display = "none";
});
controls.addEventListener("lock", function (e) {
  cross.style.display = "block";
});

/*chamging the size of the croshair*/

function crosssize() {
  let lsize = document.getElementById("left");
  let rsize = document.getElementById("right");
  let bsize = document.getElementById("bottom");
  let tsize = document.getElementById("top");

  lsize.style.width = this.value + "%";

  tsize.style.height = this.value + "%";

  bsize.style.height = this.value + "%";

  rsize.style.width = this.value + "%";

  document.getElementById("crValue").innerHTML = this.value;
}
crossHair.addEventListener("input", crosssize)
/* the ui size*/

function uisize() {
  const displ1 = document.getElementById("display1");
  const displ2 = document.getElementById("display2");
  const wea = document.getElementById("weapon-ui");
  const displ4 = document.getElementById("controlspanel");

  displ1.style.width = this.value + "%";

  displ2.style.width = this.value + "%";

  displ4.style.width = this.value + "%";

  wea.style.width = this.value + "%";

  document.getElementById("uiValue").innerHTML = this.value;
}
UiSize.addEventListener("input", uisize)

/*x out the settings*/

function xout() {
  const x = document.getElementsByClassName("x");
  const display1 = document.getElementById("display1");
  const display2 = document.getElementById("display2");
  const display3 = document.getElementById("weapon-ui");
  const display4 = document.getElementById("controlspanel");
  if (x) {
    display1.style.display = "none";
    display2.style.display = "none";
    display3.style.display = "none";
    display4.style.display = "none";
  }
}

//looping throught the class x
for (let i = 0; i < x.length; i++){

  x[i].addEventListener("click", xout);
}


function movechat() {
  const chat = document.getElementById("chat");
  chat.style.left = "0.5%";
  chat.style.height = "40%";
  chat.style.top = "50%";
}

function chatOriginalpos() {
  const chat = document.getElementById("chat");
  chat.style.left = "11%";
  chat.style.height = "50%";
  chat.style.top = "50%";
}

controls.addEventListener("lock", movechat);
controls.addEventListener("unlock", chatOriginalpos);

/* creates div into the parent every time there is an input*/
const log = function ({text, bgcolor="white", color = "black"}) {
  const parent = document.getElementById("message-Area");
  const el = document.createElement("div");
  el.innerHTML = text;

  el.style.border = "2px solid green";
  parent.appendChild(el);

  if (
    el.innerHTML === "someone joined the game" ||
    el.innerHTML === "someone left the game"
  ) {
    el.style.background = "purple";
  }

  //set the color and background color of the text
  el.style.background = bgcolor;
  el.style.color = color;

};

/*logs the text every time it is sumbitted*/
const onChatSubmitted = function (e) {
  e.preventDefault();

  const input = document.getElementById("inputmessage");
  const msg = document.getElementById("message-Area");
  const text = input.value;
  input.value = "";

  if (text === "") {
    return false;
  }

  if (text === " ") {
    return false;
  }

  sock.emit("typing", text);

  //unfocus from chat when submit text
  input.blur();

  //make chat scroll after every message
  setInterval(function () {
    msg.scrollTo(0, msg.scrollHeight);
  }, 1000);
};

/*logs welcome into the chat when the page is loaded*/
function say(){
  //if it s text is true the when is is submitted it should log text
  if (text) {
    const chat = document.getElementById("chat");
    chat.addEventListener("submit", onChatSubmitted);
  }
}
say();

window.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    const chat = document.getElementById("inputmessage");
    chat.focus();
  }
});

/* custom scope*/
function customscope() {
  let url = document.getElementById("scope-url").value;
  scope.src = url;
  //if there is no input set default to image/scope.jpg
  if (url === "") {
    scope.src = "image/scope.jpg";
  }
}
scope_url.addEventListener("input", customscope);

/*the hp bar*/
const hpbar = document.getElementById("progress-bar");
function healthbarpos(e) {
  hpbar.style.display = "block";
}

function healthbarpos2(e) {
  hpbar.style.display = "none";
}

controls.addEventListener("lock", healthbarpos);
controls.addEventListener("unlock", healthbarpos2);

/* disables the rightclick*/
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  return false;
});

function uidisplayagain(e) {
  //showing the ui when the timer is up
  // console.log(e.keyCode);
  if (e.keyCode === 27) {
    const ui = document.getElementById("Ui");
    const weapon_button = document.getElementById("weapon-button");
    const chat = document.getElementById("chat");
    const btn = document.getElementById("button");
    const logo = document.getElementById("logo");
    chat.style.left = "11%";
    chat.style.height = "50%";
    chat.style.top = "52%";

    btn.style.display = "block";
    logo.style.display = "block";
    ui.style.display = "block";
    weapon_button.style.display = "block";
  }
}
window.addEventListener("keydown", uidisplayagain);

/*the sniper button*/
let sniperbutton = document.getElementById("sniper");
let akbutton = document.getElementById("ak");
let semibutton = document.getElementById("semi");
let rocketbutton = document.getElementById("rocket");
let shotbutton = document.getElementById("shotgun");

function classselect1(e) {
  bullet = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.5),
    new THREE.MeshBasicMaterial({
      color: "white"
    })
  );
  scope.src = "image/scope.jpg";
  scope.style.position = "absolute";
  scope.style.width = "40%";
  scope.style.height = "70%";
  scope.style.top = "15%";
  scope.style.left = "29.99%";
  scene.add(bullet);
  // setInterval(inte, 5000);
}
sniperbutton.addEventListener("click", classselect1);

/*the ak function to make it activate*/
function classselect2(e) {
  bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 0.2, 0.5),
    new THREE.MeshBasicMaterial({
      color: "blue"
    })
  );

  scene.add(bullet);
  // setInterval(inte, 100);
  scope.src = "image/reticle.jpg";
  scope.style.position = "absolute";
  scope.style.width = "20px";
  scope.style.height = "20px";
  scope.style.top = "50%";
  scope.style.left = "50%";
  if (rightclick) {
    camera.scale.z = 4;
  }
}
akbutton.addEventListener("click", classselect2);

// the function that controls the behavour of the semi class.
function classsecet3(e) {
  bullet = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 0.2, 0.5),
    new THREE.MeshBasicMaterial({ color: "red" })
  );
  scene.add(bullet);
  // setInterval(inte, 500);
  //set the scope to a reticle
  scope.src = "image/reticle.jpg";
  scope.style.position = "absolute";
  scope.style.width = "20px";
  scope.style.height = "20px";
  scope.style.top = "50%";
  scope.style.left = "50%";
  if (rightclick) {
    camera.scale.z = 4;
  }
}
semibutton.addEventListener("click", classsecet3);

// the function that controls the behavour of the rocket class.
function classsecet4(e) {
  bullet = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 1),
    new THREE.MeshBasicMaterial({ color: "orange" })
  );
  scene.add(bullet);
  //set the scope to a reticle
  scope.src = "image/reticle.jpg";
  scope.style.position = "absolute";
  scope.style.width = "20px";
  scope.style.height = "20px";
  scope.style.top = "50%";
  scope.style.left = "50%";
  bulletspeed = 50;
}
rocketbutton.addEventListener("click", classsecet4);

/*the shotgun class*/
function classselect5(e) {
  bullet = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.2, 0.5),
    new THREE.MeshBasicMaterial({
      color: "white"
    })
  );

  let bullet2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 0.2, 0.5),
    new THREE.MeshBasicMaterial({
      color: "purple"
    })
  );

  let bullet3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 0.2, 0.5),
    new THREE.MeshBasicMaterial({
      color: "blue"
    })
  );
  scene.add(bullet, bullet2, bullet3);

  (function render() {
    requestAnimationFrame(render);
    bullet2.position.set(
      bullet.position.x - 10,
      bullet.position.y,
      bullet.position.z
    );

    //the thrid bullets
    bullet3.position.set(
      bullet.position.x + 10,
      bullet.position.y,
      bullet.position.z
    );
  })();
  bullets.push(bullet2);
  bullets.push(bullet3);

  scope.src = "image/reticle.jpg";
  scope.style.position = "absolute";
  scope.style.width = "20px";
  scope.style.height = "20px";
  scope.style.top = "50%";
  scope.style.left = "50%";
  scene.add(bullet);
  setInterval(function () {
    scene.remove(bullet, bullet2, bullet3);
  }, 100);

  setInterval(function () {
    scene.add(bullet, bullet2, bullet3);
  }, 200);
}
shotbutton.addEventListener("click", classselect5);

//sets the default weapon to shotgun
// window.onload = akbutton.click();
export{
  log,
  cross,
  chatOriginalpos,
  movechat
}