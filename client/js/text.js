import * as THREE from "../library/three.module.js";
import {scene, camera} from "./three.js";
import { clientId} from "./client.js";
import { io } from "https://cdn.socket.io/4.4.0/socket.io.esm.min.js";


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
    let canvas1 = document.createElement("canvas");
    canvas1.setAttribute("id", "text_canvas");
    var context1 = canvas1.getContext("2d");
    context1.font = `Bold ${size} Arial`;
    context1.fillStyle = color;
    context1.fillText(msg, 50, 80);
    // canvas contents will be used for a texture
    var texture1 = new THREE.Texture(canvas1);
    texture1.needsUpdate = true;

    var material1 = new THREE.MeshBasicMaterial({
      map: texture1,
      side: THREE.DoubleSide
    });
    material1.transparent = transparent;

    name = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material1);
    name.position.set(x, y, z);
    name.rotation.x = -3.13;
    name.rotation.y = 8;
    name.name = this.name;
    name.castShadow = castShadow;
    scene.add(name);
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

sock.on("nameTag", function(data){
  const playername = new Text({
    name: "name",
    text: sock.id,
    x: camera.position.x,
    y: -6,
    z: camera.position.z,
    width: 5,
    height: 5,
    size: "15px",
    color: "green",
    transparent: false
  });
});

export{
  Text
}