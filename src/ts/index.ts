import * as THREE from 'three';

import Engine from './engine/Engine';

import "../css/index.css";
import DebugWorld from './DebugWorld';

console.log("hello world!");



const engine = new Engine();

//engine.scene.add(mesh);

engine.launch();

engine.activeWorld = new DebugWorld();
engine.activeWorld = new DebugWorld();

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