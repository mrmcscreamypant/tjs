import * as THREE from 'three';

const manager = new THREE.LoadingManager();

const textureLoader = new THREE.TextureLoader();

const Loaders = {
    TEXTURE: new THREE.TextureLoader(manager),
}

export function loadColorTexture( path: string ) {
  const texture = Loaders.TEXTURE.load( path );
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default Loaders;