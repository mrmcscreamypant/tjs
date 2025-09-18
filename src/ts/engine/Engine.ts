import * as THREE from 'three';
import IWorld from './IWorld';
import Post from './Post';

export default class Engine {
    public readonly renderer: THREE.WebGLRenderer;
    public post: Post | undefined;
    private _activeWorld: IWorld | undefined;

    public constructor() {
        this.renderer = this.setupRenderer();
        this.setupResizeWatcher();
    }

    public setupRenderer() {
        return new THREE.WebGLRenderer({
            powerPreference: "high-performance",
            antialias: true,
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
        if (this._activeWorld) {
            this._activeWorld.dispose();
        }
        this.post = new Post(this.renderer, world.scene, world.camera);
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
            this.post.render();
        }
    }
}