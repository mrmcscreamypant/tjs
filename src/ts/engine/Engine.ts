import * as THREE from 'three';
import IWorld from './IWorld';
import Post from './Post';
import Input from './Input';

export default class Engine {
    public readonly renderer: THREE.WebGLRenderer;
    public post: Post | undefined;
    public readonly input: Input;
    private _activeWorld: IWorld | undefined;
    public readonly ctx: HTMLElement = document.getElementById("display")

    public constructor() {
        this.renderer = this.setupRenderer();
        this.input = new Input(this);
        this.setupResizeWatcher();
    }

    public setupRenderer(): THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer({
            canvas: this.ctx,
            powerPreference: "high-performance",
            antialias: false,
            stencil: false,
            depth: false
        });
        return renderer;
    }

    private doResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.post.composer.setSize(window.innerWidth, window.innerHeight);
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
        this.post = new Post(this, world.scene, world.camera.raw);
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