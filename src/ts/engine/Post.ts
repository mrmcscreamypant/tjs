import * as THREE from 'three';

import { BloomEffect, EffectComposer, EffectPass, RenderPass } from 'postprocessing';
import Engine from './Engine';

export default class Post {
    private readonly engine: Engine;
    public readonly composer: EffectComposer;

    constructor(engine: Engine, scene: THREE.Scene, camera: THREE.Camera) {
        this.engine = engine;
        this.composer = new EffectComposer(this.engine.renderer);

        const renderPass = new RenderPass(scene, camera);
        this.composer.addPass(renderPass);

        this.composer.addPass(new EffectPass(camera, new BloomEffect()));
    }

    public render() {
        this.composer.render();
    }
}