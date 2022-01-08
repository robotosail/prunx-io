import * as THREE from "../library/three.module.js";
import {scene, world} from "./three.js";
const CANNON = window.CANNON;

class BOX{
  constructor({ name, color = "green", x = 0, y = 0, z = 0, size={x:4, y:4, z:4}, mass=10, texture, materialType={clearcoat: 1.0, clearcoatRoughness:0.1, metalness: 0.9, roughness:0.5}}){
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.texture = texture;
    this.materialType = materialType;
    this.name = name;
    this.mesh = undefined;
    this.nameBody = undefined;
    this.color = color;
    this.mass = mass;
    this.draw(this.x,
       this.y, this.z, this.size, this.color, this.mass, this.texture, this.materialType);
  }
  draw(x, y, z, size, color, mass, texture, materialType){
    //the threeJs
    let material;
    const mesh = new THREE.BoxGeometry(size.x, size.y, size.z);
    
    //check if it should be phong or not
    if(materialType === "phong"){
      material = new THREE.MeshPhongMaterial({color: color, map: texture});
    }
     else if(materialType === "basic"){
       material = new THREE.MeshBasicMaterial({color: color});
      }
      else if(materialType === "normal"){
        material = new THREE.MeshNormalMaterial({color: color});
       }
       else if(materialType === "physical"){
         material = new THREE.MeshPhysicalMaterial( {
          clearcoat: materialType.clearcoat,
          clearcoatRoughness: materialType.clearcoatRoughness,
          metalness: materialType.metalness,
          roughness: materialType.roughness,
          color: color
        } );
      }
        else if(materialType === "standard"){
        material = new THREE.MeshStandardMaterial({color: color});          
        }
    this.mesh = new THREE.Mesh(mesh, material);
    //checks if a texture was set
    try{

    if (texture){
      material.map = texture;
    }
    }
    catch(err){
      console.log(err);
    }

    scene.add(this.mesh);
    this.mesh.name = this.name;
    //CANNONJS
    const shape = new CANNON.Box(new CANNON.Vec3(size.x/2, size.y/2, size.z/2));
    this.nameBody = new CANNON.Body({shape: shape, mass: mass});
    world.add(this.nameBody);
    this.nameBody.position.set(x, y, z);
   
  }
  animate(){
    this.mesh.position.copy(this.nameBody.position);
    this.mesh.quaternion.copy(this.nameBody.quaternion);
  }
}


export{
  BOX
}
