import {scene, renderer} from "./three.js";
//clearing the scene
function clearScene(){
	console.clear();
console.log('dispose renderer!');
renderer.dispose();

const cleanMaterial = material => {
	// console.log('dispose material!');
	material.dispose();

	// dispose textures
	for (const key of Object.keys(material)) {
		const value = material[key]
		if (value && typeof value === 'object' && 'minFilter' in value) {
			// console.log('dispose texture!');
			value.dispose();
		}
	}
}

scene.traverse(object => {
	if (!object.isMesh) return;
	
	// console.log('dispose geometry!');
	object.geometry.dispose();

	if (object.material.isMaterial) {
		cleanMaterial(object.material);
	} else {
		// an array of materials
		for (const material of object.material) cleanMaterial(material);
	}
});
}

export{
	clearScene
}
