//"use strict";
import {THREE, scene, collideObject, camera, CANNON, world} from "./three.js";
let color = "gray";

const mass = 0, material = "groundMaterial";
//the first house
function stairs() {
  const stairs1Shape = new CANNON.Box(new CANNON.Vec3(90/2, 2/2, 57/2));
  let stairs1Body = new CANNON.Body({mass: mass, shape: stairs1Shape, material: material});
  world.add(stairs1Body);

  const stairs1Geo = new THREE.BoxGeometry(90, 2, 57);
  const stairs1Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs1 = new THREE.Mesh(stairs1Geo, stairs1Mat);


  const stairs2Shape = new CANNON.Box(new CANNON.Vec3(83/2, 2/2, 57/2));
  let stairs2Body = new CANNON.Body({mass: mass, shape: stairs2Shape, material: material});
  world.add(stairs2Body);

  const stairs2Geo = new THREE.BoxGeometry(83, 2, 57);
  const stairs2Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs2 = new THREE.Mesh(stairs2Geo, stairs2Mat);


  const stairs3Shape = new CANNON.Box(new CANNON.Vec3(80/2, 2/2, 57/2));
  let stairs3Body = new CANNON.Body({mass: mass, shape: stairs3Shape, material: material});
  world.add(stairs3Body);

  const stairs3Geo = new THREE.BoxGeometry(80, 2, 57);
  const stairs3Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs3 = new THREE.Mesh(stairs3Geo, stairs3Mat);


  const stairs4Shape = new CANNON.Box(new CANNON.Vec3(75/2, 2/2, 57/2));
  let stairs4Body = new CANNON.Body({mass: mass, shape: stairs4Shape, material: material});
  world.add(stairs4Body);

  const stairs4Geo = new THREE.BoxGeometry(75, 2, 57);
  const stairs4Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs4 = new THREE.Mesh(stairs4Geo, stairs4Mat);

//CANNONJS
  const stairs5Shape = new CANNON.Box(new CANNON.Vec3(69/2, 2/2, 57/2));
  let stairs5Body = new CANNON.Body({mass: mass, shape: stairs5Shape, material: material});
  world.add(stairs5Body);

  const stairs5Geo = new THREE.BoxGeometry(69, 2, 57);
  const stairs5Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs5 = new THREE.Mesh(stairs5Geo, stairs5Mat);


  const stairs6Shape = new CANNON.Box(new CANNON.Vec3(65/2, 2/2, 57/2));
  let stairs6Body = new CANNON.Body({mass: mass, shape: stairs6Shape, material: material});
  world.add(stairs6Body);

  const stairs6Geo = new THREE.BoxGeometry(65, 2, 57);
  const stairs6Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs6 = new THREE.Mesh(stairs6Geo, stairs6Mat);


  const stairs7Shape = new CANNON.Box(new CANNON.Vec3(57/2, 2/2, 57/2));
  let stairs7Body = new CANNON.Body({mass: mass, shape: stairs7Shape, material: material});
  world.add(stairs7Body);

  const stairs7Geo = new THREE.BoxGeometry(57, 2, 57);
  const stairs7Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs7 = new THREE.Mesh(stairs7Geo, stairs7Mat);


  const stairs8Shape = new CANNON.Box(new CANNON.Vec3(54/2, 2/2, 57/2));
  let stairs8Body = new CANNON.Body({mass: mass, shape: stairs8Shape, material: material});
  world.add(stairs8Body);

  const stairs8Geo = new THREE.BoxGeometry(54, 2, 57);
  const stairs8Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs8 = new THREE.Mesh(stairs8Geo, stairs8Mat);

  const stairs9Shape = new CANNON.Box(new CANNON.Vec3(52/2, 2/2, 57/2));
  let stairs9Body = new CANNON.Body({mass: mass, shape: stairs9Shape, material: material});
  world.add(stairs9Body);

  const stairs9Geo = new THREE.BoxGeometry(52, 2, 57);
  const stairs9Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs9 = new THREE.Mesh(stairs9Geo, stairs9Mat);

  const stairs10Shape = new CANNON.Box(new CANNON.Vec3(50/2, 2/2, 57/2));
  let stairs10Body = new CANNON.Body({mass: mass, shape: stairs10Shape, material: material});
  world.add(stairs10Body);

  const stairs10Geo = new THREE.BoxGeometry(50, 2, 57);
  const stairs10Mat = new THREE.MeshBasicMaterial({ color: color });
  let stairs10 = new THREE.Mesh(stairs10Geo, stairs10Mat);


  const stairs11Shape = new CANNON.Box(new CANNON.Vec3(46/2, 2/2, 57/2));
  let stairs11Body = new CANNON.Body({mass: mass, shape: stairs11Shape, material: material});
  world.add(stairs11Body);

  let stairs11 = new THREE.Mesh(
    new THREE.BoxGeometry(46, 2, 57),
    new THREE.MeshBasicMaterial({ color: color })
  );


  const stairs12Shape = new CANNON.Box(new CANNON.Vec3(43/2, 2/2, 57/2));
  let stairs12Body = new CANNON.Body({mass: mass, shape: stairs12Shape, material: material});
  world.add(stairs2Body);

  let stairs12 = new THREE.Mesh(
    new THREE.BoxGeometry(43, 2, 57),
    new THREE.MeshBasicMaterial({ color: color })
  );

  //the position for the stairs
  stairs1Body.position.set(-154, -2.5, 56);

  stairs2Body.position.set(-156, -3, 56);

  stairs3Body.position.set(-160, -10, 56);

  stairs4Body.position.set(-162, -13, 56);

  stairs5Body.position.set(-166, -15, 56);

  stairs6Body.position.set(-167, -18, 56);

  stairs7Body.position.set(-169, -20, 56);

  stairs8Body.position.set(-171, -23, 56);

  stairs9Body.position.set(-174, -25, 56);
  
  stairs10Body.position.set(-175, -27, 56);

  stairs11Body.position.set(-177, -29, 56);

  stairs12Body.position.set(-179, -31, 56);

  //   //addig the stairs to the map
  scene.add(
    stairs1,
    stairs2,
    stairs3,
    stairs4,
    stairs5,
    stairs6,
    stairs7,
    stairs8,
    stairs9,
    stairs10,
    stairs11,
    stairs12
  );

  //updating the stairs collision with the camera everytime;
  function animie() {
    stairs1.position.copy(stairs1Body.position);
    stairs1.quaternion.copy(stairs1Body.quaternion)

    stairs2.position.copy(stairs2Body.position);
    stairs2.quaternion.copy(stairs2Body.quaternion)
  
    stairs3.position.copy(stairs3Body.position);
    stairs3.quaternion.copy(stairs3Body.quaternion)
  
    stairs4.position.copy(stairs4Body.position);
    stairs4.quaternion.copy(stairs4Body.quaternion)
  
    stairs5.position.copy(stairs5Body.position);
    stairs5.quaternion.copy(stairs5Body.quaternion)
  
    stairs6.position.copy(stairs6Body.position);
    stairs6.quaternion.copy(stairs6Body.quaternion)
  
    stairs7.position.copy(stairs7Body.position);
    stairs7.quaternion.copy(stairs7Body.quaternion)
  
    stairs8.position.copy(stairs8Body.position);
    stairs8.quaternion.copy(stairs8Body.quaternion)
  
    stairs9.position.copy(stairs9Body.position);
    stairs9.quaternion.copy(stairs9Body.quaternion)
    
    stairs10.position.copy(stairs10Body.position);
    stairs10.quaternion.copy(stairs10Body.quaternion)
  
    stairs11.position.copy(stairs11Body.position);
    stairs11.quaternion.copy(stairs11Body.quaternion)
  
    stairs12.position.copy(stairs12Body.position);
    stairs12.quaternion.copy(stairs12Body.quaternion)
  }
  animie();
}
stairs();

export{
  color,
  stairs
}