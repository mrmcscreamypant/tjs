import * as THREE from 'three';
import IWorld from './IWorld';

export default class Engine {
    public renderer: THREE.WebGLRenderer;
    public activeWorld: IWorld | undefined;

    public constructor() {
        this.renderer = this.setupRenderer();
    }

    public setupRenderer() {
        return new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: true
        });
    }

    public launch() {
        this.renderer.setAnimationLoop(() => { this.mainloop(); });
    }

    private mainloop() {
        if (this.activeWorld) {
            this.activeWorld.mainloop();
            this.renderer.render(this.activeWorld.scene, this.activeWorld.camera);
        }
    }
}