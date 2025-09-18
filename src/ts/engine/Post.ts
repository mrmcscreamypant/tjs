import * as THREE from 'three';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export default class Post {
    public readonly composer: EffectComposer;

    constructor(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) {
        this.composer = new EffectComposer(renderer);

        const renderPass = new RenderPass(scene, camera);
        this.composer.addPass(renderPass);

        const glitchPass = new GlitchPass();
        this.composer.addPass(glitchPass);

        const outputPass = new OutputPass();
        this.composer.addPass( outputPass );
    }

    public render() {
        this.composer.render();
    }
}