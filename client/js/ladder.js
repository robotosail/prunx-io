//create a blue LineBasicMaterial
import * as THREE from "../library/three.module.js";
import {scene} from "./three.js";

const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push( new THREE.Vector3( 10, 10, 0 ) );
points.push( new THREE.Vector3( 7, 0, 10 ) );

const geometry = new THREE.BoxGeometry(10, 10, 10).setFromPoints( points );


const line = new THREE.Line( geometry, material );

scene.add( line );

console.log(line.position.x)