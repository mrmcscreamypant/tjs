import * as THREE from 'three';

import Engine from './engine/Engine';

import "../css/index.css";
import IntroWorld from './worlds/intro/IntroWorld';
import DebugWorld from './DebugWorld';

console.log("%c hello world!", "font-family:'Comic Sans MS';font-size: 50px;color: green;");

const engine = new Engine();

engine.launch();

//@ts-ignore .env exists, no matter what you think
if (import.meta.env.DEV) {
    engine.activeWorld = new DebugWorld(engine);
} else {
    engine.activeWorld = new IntroWorld(engine);
}