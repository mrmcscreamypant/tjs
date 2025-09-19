import * as THREE from 'three';
import * as QUARKS from 'three.quarks';

import smoke from './smoke.png';
import { loadColorTexture } from '../engine/AssetLoader';

export default new QUARKS.ParticleSystem({
    duration: 1,
    looping: true,
    shape: new QUARKS.PointEmitter(),
    emissionOverTime: new QUARKS.ConstantValue(0.9),

    worldSpace: true,
    renderMode: QUARKS.RenderMode.BillBoard,

    startLife: new QUARKS.IntervalValue(3, 5),
    startSize: new QUARKS.ConstantValue(0.1),

    material: new THREE.MeshPhongMaterial({
        map: loadColorTexture(smoke),
        transparent: true,
    }),

    behaviors: [
        new QUARKS.ForceOverLife(
            new QUARKS.ConstantValue(0),
            new QUARKS.PiecewiseBezier([[new QUARKS.Bezier(0.5, 1, -1, 0), 0]]),
            new QUARKS.ConstantValue(0),
        ),
        new QUARKS.SizeOverLife(
            new QUARKS.Vector3Function(
                new QUARKS.PiecewiseBezier([[new QUARKS.Bezier(1, 1.5, 2, 3), 0]]),
                new QUARKS.PiecewiseBezier([[new QUARKS.Bezier(1, 1.5, 2, 3), 0]]),
                new QUARKS.ConstantValue(1), // Z axis
            ),
        ),
    ]
});