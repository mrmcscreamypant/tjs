import * as THREE from 'three';

import Engine from './engine/Engine';

import "../css/index.css";
import IntroWorld from './worlds/intro/IntroWorld';
import DebugWorld from './DebugWorld';

console.log("%c hello world!", "font-family:'Comic Sans MS';font-size: 50px;color: green;");

const engine = new Engine();

//engine.scene.add(mesh);

engine.launch();

engine.activeWorld = new DebugWorld(engine);

//scene.add(mesh);

//renderer.setSize(width, height);
//renderer.setAnimationLoop(animate);

//requestAnimationFrame(function render() {

    //renderer.render(scene, camera)
	//composer.render();
	//requestAnimationFrame(render);
    //requestAnimationFrame(animate);

//});