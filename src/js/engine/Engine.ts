import * as THREE from 'three';
import IWorld from './IWorld';

export default class Engine {
    public renderer: THREE.WebGLRenderer;
    private _activeWorld: IWorld | undefined;

    public constructor() {
        this.renderer = this.setupRenderer();
        this.setupResizeWatcher();
    }

    public setupRenderer() {
        return new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: true
        });
    }

    private doResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (this.activeWorld) {
            this.activeWorld.windowResizeHook(window.innerWidth, window.innerHeight);
        }
    }

    public get activeWorld(): IWorld | undefined {
        return this._activeWorld;
    }

    public set activeWorld(world: IWorld | undefined) {
        this._activeWorld = world;
        this.doResize();
    }

    private setupResizeWatcher() {
        window.onresize = () => { this.doResize(); };
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