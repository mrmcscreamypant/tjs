import * as THREE from 'three';
import IWorld from './IWorld';

export default class Engine {
    public renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public activeWorld: IWorld | undefined
    private activeCamera: THREE.Camera;

    public constructor() {
        this.renderer = this.setupRenderer();
        this.scene = this.setupScene();
        this.activeCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
        this.activeCamera.position.z = 1
    }

    public setupRenderer() {
        return new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: true
        });
    }

    public setupScene() {
        return new THREE.Scene();
    }

    public launch() {
        this.renderer.setAnimationLoop(() => { this.mainloop(); });
    }

    private mainloop() {
        if (this.activeWorld) {
            this.activeWorld.mainloop();
        }
        this.renderer.render(this.scene, this.activeCamera);
    }
}