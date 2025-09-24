import * as THREE from 'three';
import * as QUARKS from 'three.quarks';

export default {
    duration: 1,
    looping: true,
    shape: new QUARKS.PointEmitter(),
    emissionOverTime: new QUARKS.ConstantValue(0.9),

    worldSpace: true,
    renderMode: QUARKS.RenderMode.Trail,

    startLife: new QUARKS.IntervalValue(3, 5),
    startSize: new QUARKS.ConstantValue(0.1),

    material: new THREE.MeshPhongMaterial({
        transparent: true,
    }),

    behaviors: [
        new QUARKS.ForceOverLife(
            new QUARKS.ConstantValue(0),
            new QUARKS.PiecewiseBezier([[new QUARKS.Bezier(0.5, 1, -1, 0), 0]]),
            new QUARKS.ConstantValue(0),
        ),
    ]
} satisfies QUARKS.ParticleSystemParameters;