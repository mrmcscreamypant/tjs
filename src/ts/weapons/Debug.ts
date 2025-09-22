import * as THREE from 'three';
import * as QUARKS from 'three.quarks';

import { DebugWeaponState } from "../../server/src/rooms/schema/WeaponStates";
import Weapon from "./Weapon";
import tmpTexture from '../particles/smoke.png';

const tracer = {
    duration: 1,
    looping: true,
    shape: new QUARKS.PointEmitter(),
    worldSpace: true,
    renderMode: QUARKS.RenderMode.Trail,
    startSize: new QUARKS.ConstantValue(0.01),
    rendererEmitterSettings: {
        startLength: new QUARKS.ConstantValue(5), // Length of the trail
        followLocalOrigin: true, // Whether trail follows emitter
    },
    material: new THREE.MeshToonMaterial({
        color: "#220000",
        transparent: true,
        blending: THREE.AdditiveBlending,
    }),
} satisfies QUARKS.ParticleSystemParameters;

export default class Debug extends Weapon<DebugWeaponState> {
    private tracerSystem: QUARKS.ParticleSystem;

    public init() {
        this.tracerSystem = this.tracker.track(new QUARKS.ParticleSystem(tracer));
        this.tracerSystem.emitter.position.copy(this.networkInstance.position); // move the emitter immedietly to prevent the trail from originating from (0, 0)
        this.world.particleRenderer.addSystem(this.tracerSystem);
    }

    public tick(): void {
        this.tracerSystem.emitter.position.add(
            new THREE.Vector3().copy(this.networkInstance.position).sub(
                this.tracerSystem.emitter.position
            ).divideScalar(4)
        );
    }

    public obj(): THREE.Object3D {
        return this.tracerSystem.emitter;
    }

    public dispose() {
        this.tracker.dispose();
    }
}