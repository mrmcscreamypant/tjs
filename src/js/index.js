import * as THREE from 'three';

import renderer from './engine/renderer';
import composer from './engine/composer';
import scene from './scene';
import camera from './engine/camera';

import "../css/index.css";

console.log("hello world!");

const width = window.innerWidth, height = window.innerHeight;

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

renderer.setSize(width, height);
//renderer.setAnimationLoop(animate);

requestAnimationFrame(function render() {

    renderer.render(scene, camera)
	composer.render();
	requestAnimationFrame(render);
    requestAnimationFrame(animate);

});
document.body.appendChild(renderer.domElement);

function animate(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    //renderer.render(scene, camera);
	//composer.render();
}