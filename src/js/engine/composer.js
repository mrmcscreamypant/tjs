import { OutlineEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { HalfFloatType, Raycaster } from "three";
import renderer from "./renderer";
import scene from "../scene";
import camera from "./camera";

const composer = new EffectComposer(renderer,
    {
        frameBufferType: HalfFloatType,
        multisampling: Math.min(4, renderer.capabilities.maxSamples)
    }
);
const effect = new EffectPass(camera, new OutlineEffect(scene, camera))

//effect.inverted = true;

composer.addPass(new RenderPass(scene, camera));
composer.addPass(effect);

export default composer;