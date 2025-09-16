import * as THREE from 'three';

import Engine from './engine/Engine';

import "../css/index.css";
import DebugWorld from './DebugWorld';

console.log("hello world!");



const engine = new Engine();

//engine.scene.add(mesh);

engine.launch();

engine.activeWorld = new DebugWorld();

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