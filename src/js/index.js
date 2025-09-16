import * as THREE from 'three';

import Engine from './engine/Engine';

import "../css/index.css";

console.log("hello world!");

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);

const engine = new Engine();

engine.scene.add(mesh);

engine.launch();

engine.renderer.setSize(window.innerWidth, window.innerHeight);

//scene.add(mesh);

//renderer.setSize(width, height);
//renderer.setAnimationLoop(animate);

//requestAnimationFrame(function render() {

    //renderer.render(scene, camera)
	//composer.render();
	//requestAnimationFrame(render);
    //requestAnimationFrame(animate);

//});
document.body.appendChild(engine.renderer.domElement);

function animate(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;
}