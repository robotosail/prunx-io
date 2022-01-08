import * as THREE from "../library/three.module.js";
import {scene} from "./three.js"

function wallMap2(){
  // the left wall
  const material = new THREE.TextureLoader().load("../image/darkwall.jpg");
  const blockMesh1 = new THREE.BoxGeometry(10, 300, 2006);
  const blockMat1 = new THREE.MeshBasicMaterial({color: 0x706955, map:material});
  let left_wallMap2 = new THREE.Mesh(blockMesh1, blockMat1);

  //the right wall
   const blockMesh2 = new THREE.BoxGeometry(10, 300, 2006);
  const blockMat2 = new THREE.MeshBasicMaterial({color: 0x706955, map:material});
  let right_wallMap2 = new THREE.Mesh(blockMesh2, blockMat2);

  const blockMesh3 = new THREE.BoxGeometry(2006, 300, 10);
  const blockMat3 = new THREE.MeshBasicMaterial({color: 0x706955, map:material});
  let front_wallMap2 = new THREE.Mesh(blockMesh3, blockMat3);

  const blockMesh4 = new THREE.BoxGeometry(2006, 300, 10);
  const blockMat4 = new THREE.MeshBasicMaterial({color: 0x706955, map:material});
  let  back_wallMap2 = new THREE.Mesh(blockMesh4, blockMat4);

  scene.add(left_wallMap2, right_wallMap2, front_wallMap2, back_wallMap2);

  //the position
  //the front wall
  front_wallMap2.position.x = -1;
  front_wallMap2.position.y = -90;
  front_wallMap2.position.z = -1000;
  //the left wall
  left_wallMap2.position.x = 1000;
  left_wallMap2.position.y = -90;
  left_wallMap2.position.z = -1;
  //the back wall
  back_wallMap2.position.x = 1;
  back_wallMap2.position.y = -90;
  back_wallMap2.position.z = 1000;
  //the right wall
  right_wallMap2.position.x = -1000;
  right_wallMap2.position.y = -90;
  right_wallMap2.position.z = 1;
}

function building2(){
 //the stairs base
 const baseGeometry = new THREE.BoxGeometry(2050, 100, 700);
 const baseMaterial = new THREE.MeshBasicMaterial({color:"blue"});
 let base1 = new THREE.Mesh(baseGeometry, baseMaterial);
 
 //base 2
 const baseGeometry2 = new THREE.BoxGeometry(250, 100, 300);
 const baseMaterial2 = new THREE.MeshBasicMaterial({color:"blue"});
 let base2 = new THREE.Mesh(baseGeometry2, baseMaterial2);
 
 
 //the spawn spot
 const spawnGeometry1 = new THREE.BoxGeometry(1, 300, 100);
 const spawnMaterial1 = new THREE.MeshBasicMaterial({color:"black"});
 let spawn1 = new THREE.Mesh(spawnGeometry1, spawnMaterial1);
 
 //the back wall of the spawning 
 const backGeometry1 = new THREE.BoxGeometry(200, 300, 1);
 const backMaterial1 = new THREE.MeshBasicMaterial({color:"black"});
 let back1 = new THREE.Mesh(backGeometry1, backMaterial1);
 
 //the first building
 const buildingGeometry1 = new THREE.BoxGeometry(100, 300, 100);
 const buildingMaterial1 = new THREE.MeshBasicMaterial({color: "brown"});
 let building1 = new THREE.Mesh(buildingGeometry1, buildingMaterial1);
 
 //the second building
 const buildingGeometry2 = new THREE.BoxGeometry(700, 300, 500);
 const buildingMaterial2 = new THREE.MeshBasicMaterial({color: "brown"});
 let building2 = new THREE.Mesh(buildingGeometry2, buildingMaterial2);
 
 //the third building
 const buildingGeometry3 = new THREE.BoxGeometry(200, 300, 200);
 const buildingMaterial3 = new THREE.MeshBasicMaterial({color: "brown"});
 let building3 = new THREE.Mesh(buildingGeometry3, buildingMaterial3);
 
 const buildingGeometry4 = new THREE.BoxGeometry(200, 300, 200);
 const buildingMaterial4 = new THREE.MeshBasicMaterial({color: "brown"});
 let building4 = new THREE.Mesh(buildingGeometry4, buildingMaterial4);
 
 //adding the materials to the scene
 scene.add(base1, base2, spawn1, back1, building1, building2);
 
 //position
 base1.position.x = -1;
 base1.position.y = -20;
 base1.position.z = -650;
 
 base2.position.x = -900;
 base2.position.y = -20;
 base2.position.z = -200;
 
 spawn1.position.x = 200;
 spawn1.position.y = -120;
 spawn1.position.z = -946;
 
 //the back of the spawn
 back1.position.x = 100;
 back1.position.y = -120;
 back1.position.z = -899;
 
 //the first building
 building1.position.x = -250;
 building1.position.y = -120;
 building1.position.z = -950;
 
 //the second building.
 building2.position.x = 0;
 building2.position.y = -120;
 building2.position.z = -100;
 
 // building3.position.x = ;
 // building3.position.y = -120;
 // building3.position.z = ;
 
 // building4.position.x = ;
 // building4.position.y = -120;
 // building4.position.z = ;
}

function stairsMap2(){
  const stairGoe1 = new THREE.BoxGeometry(680, 100, 100);
  const stairMat1 = new THREE.MeshLambertMaterial({color: "purple"});
  let stair1 = new THREE.Mesh(stairGoe1, stairMat1);
  
  const stairGoe2 = new THREE.BoxGeometry(680, 80, 100);
  const stairMat2 = new THREE.MeshPhongMaterial({color: "red"});
  let stair2 = new THREE.Mesh(stairGoe2, stairMat2);
  
  const stairGoe3 = new THREE.BoxGeometry(680, 60, 100);
  const stairMat3 = new THREE.MeshPhongMaterial({color: "blue"});
  let stair3 = new THREE.Mesh(stairGoe3, stairMat3);
  
  const stairGoe4 = new THREE.BoxGeometry(680, 20, 100);
  const stairMat4 = new THREE.MeshPhongMaterial({color: "green"});
  let stair4 = new THREE.Mesh(stairGoe4, stairMat4);
  
  scene.add(stair1, stair2, stair3, stair4);
  
  //position
  stair1.position.x = 680;
  stair1.position.y = -10;
  stair1.position.z = -250;
  
  stair2.position.x = 680;
  stair2.position.y = -5;
  stair2.position.z = -150;
  
  stair3.position.x = 680;
  stair3.position.y = -5;
  stair3.position.z = -50;
  
  stair4.position.x = 680;
  stair4.position.y = -5;
  stair4.position.z = 50;
  }

  export{
    wallMap2,
    building2,
    stairsMap2
  }