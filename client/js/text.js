import * as THREE from "../library/three.module.js";
import { scene, camera } from "./three.js";
import { clientId } from "./client.js";
import { otherPlayer, playerBody } from "./player.js";
// import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";


let sock = io()

class Text {
  constructor({
    name = "test",
    text = "hello world",
    x = 10,
    y = -10,
    z = 10,
    width = 4,
    height = 4,
    size = "10px",
    color = "green",
    transparent = false,
    castShadow = false
  }) {
    this.name = name;
    this.text = text;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.size = size;
    this.color = color;
    this.transparent = transparent;
    this.castShadow = castShadow;
    this.draw(
      this.text,
      this.width,
      this.height,
      this.size,
      this.color,
      this.name,
      this.x,
      this.y,
      this.z,
      this.transparent,
      this.castShadow
    );
  }
  // the draw function
  draw(
    msg,
    width,
    height,
    size,
    color,
    name,
    x,
    y,
    z,
    transparent,
    castShadow
  ) {
    const canvas1 = document.createElement("canvas");
    const pxsize = size * 2.5
    const borderThickness = 4
    
    canvas1.setAttribute("id", "text_canvas");
    // canvas1.width = pxsize
    // canvas1.height = size-5

    const ctx = canvas1.getContext("2d");
    ctx.font = `Bold ${size}px Arial`;
    var metrics = ctx.measureText(msg); //calculate the texts with
    var textWidth = metrics.width; //calculate the texts with
    ctx.lineWidth = borderThickness;

    ctx.fillStyle = 'rgba(100, 160, 220, 1)';
    ctx.strokeStyle = 'rgba(120, 50, 20, 1)';
    // ctx.fillRect(borderThickness / 2, borderThickness / 2, textWidth + borderThickness, size * 1.4 + borderThickness, 6)
    // creating the rounded borders 
    
    ctx.save() //save the current state
    ctx.translate(canvas1.width/2 + 60, canvas1.height/2 + 20)
    roundRect(ctx, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, size * 1.4 + borderThickness, 6);
    ctx.fillStyle = color;
    ctx.rotate((360*Math.PI)/360) // covert radians to degrees - ((degrees * Math.PI)/360); from degrees to radians ((degrees * Math.PI)/100)
    ctx.fillText(msg, 4, (size + 4));
    ctx.restore();


    // canvas contents will be used for a texture
    const texture1 = new THREE.Texture(canvas1);
    texture1.needsUpdate = true;

    const material1 = new THREE.SpriteMaterial({
      map: texture1,
      side:0
    });
    console.log(material1)
    material1.transparent = transparent;
    // instead of new mesh it is new sprite
    name = new THREE.Sprite(material1);
    name.scale.set(20,20,1.0);
    name.position.set(x, y, z);
    name.name = this.name;
    // name.center = new THREE.Vector3(0.3, 4, 0)
    // name.castShadow = castShadow;
    scene.add(name)
    
    // return name;
  }
}

/*
// the order it goes in
       name = "test",
    text = "hello world", //default
    x = 10,               //default
    y = -10,              //default
    z = 10,               //default
    width = 4,            //default
    height = 4,           //default
    size = "10px",        //default
    color = "green",      //default
    transparent = false,  //default
    castShadow = false    //default
*/

sock.on("nameTag", function (data) {
  const playername = new Text({
    name: "name",
    text: data,
    x: playerBody.position.x,
    y: -16,
    z: playerBody.position.z - 50,
    size: 15,
    color: "green",
    transparent: true
  });
})

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export {
  Text
}