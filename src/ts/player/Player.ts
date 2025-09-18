import * as THREE from 'three';
import { Keys } from '../engine/Input';
import ITickedObject from '../engine/ITickedObject';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import IWorld from '../engine/IWorld';
import PhysicsObject from '../engine/NewtonObject';

export default class Player extends PhysicsObject implements ITickedObject {
    public readonly world: IWorld;
    private readonly mesh: THREE.Mesh;

    constructor(world: IWorld) {
        super();
        this.world = world;

        const geom = new TeapotGeometry(0.2, 10);
        const material = new THREE.MeshMatcapMaterial();
        this.mesh = new THREE.Mesh(geom, material);

        this.mesh.rotation.x = -Math.PI / 2;
    }

    public obj(): THREE.Mesh {
        return this.mesh;
    }

    public tick() {
        super.tick()

        let direction = this.mesh.getWorldDirection(new THREE.Vector3());

        this.applyImpulse(direction.divideScalar(100));

        if (this.world.engine.input.getKey(Keys.LEFT_ARROW)) {
            this.rotVel.z += 0.025;
        } else if (this.world.engine.input.getKey(Keys.RIGHT_ARROW)) {
            this.rotVel.z -= 0.025;
        }

        if (this.world.engine.input.getKey(Keys.W)) {
            this.rotVel.x -= Math.cos(this.mesh.rotation.z) * 0.025;
            this.rotVel.y -= Math.sin(this.mesh.rotation.z) * 0.025;
        } else if (this.world.engine.input.getKey(Keys.S)) {
            this.rotVel.x += Math.cos(this.mesh.rotation.z) * 0.025;
            this.rotVel.y += Math.sin(this.mesh.rotation.z) * 0.025;
        }

        this.rotVel.x *= 0.9;
        this.rotVel.y *= 0.9;
        this.rotVel.z *= 0.9;

        this.mesh.rotation.x += ((-Math.PI / 2) - this.mesh.rotation.x) * 0.4;
        this.mesh.rotation.y += (0-this.mesh.rotation.y) * 0.4;

        this.world.camera.position.set(
            this.mesh.position.x+Math.sin(this.mesh.rotation.z),
            this.mesh.position.y+0.5,
            this.mesh.position.z+Math.cos(this.mesh.rotation.z)
        )

        this.world.camera.lookAt(this.mesh.position);
    }
}