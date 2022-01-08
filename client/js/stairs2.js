  //the second stairs on the second house;
import {THREE, scene, collideObject, camera, CANNON, world} from "./three.js";
import {color} from "./stairs.js"

const mass = 0, material = "groundMaterial";

  function stairs2(){
    //CANNONJS
    const stairs12Shape = new CANNON.Box(new CANNON.Vec3(90/2, 1/2, 57/2));
    let stairs12Body = new CANNON.Body({mass: mass, shape: stairs12Shape, material: material});
    world.add(stairs12Body);

    //THREEJS
    let stairs12 = new THREE.Mesh(new THREE.BoxGeometry(90,1,57), new THREE.MeshBasicMaterial({color: color}));
  
    //CANNONJS
    const stairs22Shape = new CANNON.Box(new CANNON.Vec3(83/2, 1/2, 57/2));
    let stairs22Body = new CANNON.Body({mass: mass, shape: stairs22Shape, material: material});
    world.add(stairs22Body);
    
    //THREEJS
    let stairs22 = new THREE.Mesh(new THREE.BoxGeometry(83,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs32Shape = new CANNON.Box(new CANNON.Vec3(80/2, 1/2, 57/2));
    let stairs32Body = new CANNON.Body({mass: mass, shape: stairs32Shape, material: material});
    world.add(stairs32Body);
    
    //THREEJS
    let stairs32 = new THREE.Mesh(new THREE.BoxGeometry(80,1,57), new THREE.MeshBasicMaterial({color: color}));
  
    //CANNONJS
    const stairs42Shape = new CANNON.Box(new CANNON.Vec3(75/2, 1/2, 57/2));
    let stairs42Body = new CANNON.Body({mass: mass, shape: stairs42Shape, material: material});
    world.add(stairs42Body);
    
    //THREEJS
    let stairs42 = new THREE.Mesh(new THREE.BoxGeometry(75,1,57), new THREE.MeshBasicMaterial({color: color}));
  
    //CANNONJS
    const stairs52Shape = new CANNON.Box(new CANNON.Vec3(69/2, 1/2, 57/2));
    let stairs52Body = new CANNON.Body({mass: mass, shape: stairs52Shape, material: material});
    world.add(stairs52Body);
    
    //THREEJS
    let stairs52 = new THREE.Mesh(new THREE.BoxGeometry(69,1,57), new THREE.MeshBasicMaterial({color: color}));
  
    //CANNONJS
    const stairs62Shape = new CANNON.Box(new CANNON.Vec3(65/2, 1/2, 57/2));
    let stairs62Body = new CANNON.Body({mass: mass, shape: stairs62Shape, material: material});
    world.add(stairs62Body);
    
    //THREEJS
    let stairs62 = new THREE.Mesh(new THREE.BoxGeometry(65,1,57), new THREE.MeshBasicMaterial({color: color}));
  
    //CANNONJS
    const stairs72Shape = new CANNON.Box(new CANNON.Vec3(57/2, 1/2, 57/2));
    let stairs72Body = new CANNON.Body({mass: mass, shape: stairs72Shape, material: material});
    world.add(stairs72Body);
    
    //THREEJS
    let stairs72 = new THREE.Mesh(new THREE.BoxGeometry(57,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs82Shape = new CANNON.Box(new CANNON.Vec3(54/2, 1/2, 57/2));
    let stairs82Body = new CANNON.Body({mass: mass, shape: stairs82Shape, material: material});
    world.add(stairs82Body);
    
    //THREEJS
    let stairs82 = new THREE.Mesh(new THREE.BoxGeometry(54,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs92Shape = new CANNON.Box(new CANNON.Vec3(52/2, 1/2, 57/2));
    let stairs92Body = new CANNON.Body({mass: mass, shape: stairs92Shape, material: material});
    world.add(stairs92Body);
    
    //THREEJS
    let stairs92 = new THREE.Mesh(new THREE.BoxGeometry(52,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs120Shape = new CANNON.Box(new CANNON.Vec3(56/2, 1/2, 57/2));
    let stairs120Body = new CANNON.Body({mass: mass, shape: stairs120Shape, material: material});
    world.add(stairs120Body);
    
    //THREEJS
    let stairs120 = new THREE.Mesh(new THREE.BoxGeometry(50,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs121Shape = new CANNON.Box(new CANNON.Vec3(46/2, 1/2, 57/2));
    let stairs121Body = new CANNON.Body({mass: mass, shape: stairs121Shape, material: material});
    world.add(stairs121Body);
    
    //THREEJS
    let stairs121 = new THREE.Mesh(new THREE.BoxGeometry(46,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs122Shape = new CANNON.Box(new CANNON.Vec3(43/2, 1/2, 57/2));
    let stairs122Body = new CANNON.Body({mass: mass, shape: stairs122Shape, material: material});
    world.add(stairs122Body);
    
    //THREEJS
    let stairs122 = new THREE.Mesh(new THREE.BoxGeometry(43,1,57), new THREE.MeshBasicMaterial({color: color}));
    
    //CANNONJS
    const stairs123Shape = new CANNON.Box(new CANNON.Vec3(40/2, 1/2, 57/2));
    let stairs123Body = new CANNON.Body({mass: mass, shape: stairs123Shape, material: material});
    world.add(stairs123Body);
    
    //THREEJS
    let stairs123 = new THREE.Mesh(new THREE.BoxGeometry(40,1,57), new THREE.MeshBasicMaterial({color: "red"}));

    //CANNONJS
    const stairs124Shape = new CANNON.Box(new CANNON.Vec3(40/2, 1/2, 57/2));
    let stairs124Body = new CANNON.Body({mass: mass, shape: stairs124Shape, material: material});
    world.add(stairs124Body);
    
    //THREEJS
    let stairs124 = new THREE.Mesh(new THREE.BoxGeometry(40,1,57), new THREE.MeshBasicMaterial({color: "red"}));

  
  //the position for the stairs
  stairs12Body.position.set(154, -2, -85);

  stairs22Body.position.set(156, -3, -85);

  stairs32Body.position.set(160, -4, -85);

  stairs42Body.position.set(162, -5, -85);
  
  stairs52Body.position.set(166, -6, -85);

  stairs62Body.position.set(167, -7, -85);

  stairs72Body.position.set(169, -8, -85);

  stairs82Body.position.set(171, -9, -85);

  stairs92Body.position.set(174, -10, -85);

  stairs120Body.position.set(175, -11, -85);
  
  stairs121Body.position.set(177, -12, -85);
  
  stairs122Body.position.set(179, -13, -85);

  stairs123Body.position.set(181, -14, -85);

  stairs124Body.position.set(183, -15, -85);

  
    
    scene.add(stairs12, stairs22, stairs32, stairs42, stairs52, stairs62, stairs72, stairs82, stairs92, stairs120, stairs121, stairs122, stairs123, stairs124);

  
    function animie12(){
      requestAnimationFrame(animie12);
      stairs12.position.copy(stairs12Body.position)
      stairs12.quaternion.copy(stairs12Body.quaternion)

      stairs22.position.copy(stairs22Body.position)
      stairs22.quaternion.copy(stairs22Body.quaternion)
      
      stairs32.position.copy(stairs32Body.position)
      stairs32.quaternion.copy(stairs32Body.quaternion)
      
      stairs42.position.copy(stairs42Body.position)
      stairs42.quaternion.copy(stairs42Body.quaternion)
      
      stairs52.position.copy(stairs52Body.position)
      stairs52.quaternion.copy(stairs52Body.quaternion)
      
      stairs62.position.copy(stairs62Body.position)
      stairs62.quaternion.copy(stairs62Body.quaternion)
      
      stairs72.position.copy(stairs72Body.position)
      stairs72.quaternion.copy(stairs72Body.quaternion)
      
      stairs82.position.copy(stairs82Body.position)
      stairs82.quaternion.copy(stairs82Body.quaternion)
      
      stairs92.position.copy(stairs92Body.position)
      stairs92.quaternion.copy(stairs92Body.quaternion)
      
      stairs120.position.copy(stairs120Body.position)
      stairs120.quaternion.copy(stairs120Body.quaternion)
      
      stairs121.position.copy(stairs121Body.position)
      stairs121.quaternion.copy(stairs121Body.quaternion)
      
      stairs122.position.copy(stairs122Body.position)
      stairs122.quaternion.copy(stairs122Body.quaternion)

      stairs123.position.copy(stairs123Body.position)
      stairs123.quaternion.copy(stairs123Body.quaternion)

      stairs124.position.copy(stairs124Body.position)
      stairs124.quaternion.copy(stairs124Body.quaternion)

    }
    animie12();
    
  }stairs2();
    
export{
  stairs2
}