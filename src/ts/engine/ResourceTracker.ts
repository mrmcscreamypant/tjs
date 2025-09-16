import * as THREE from 'three';

export default class ResourceTracker {
    private resources: Set<any>;

    public constructor() {
        this.resources = new Set();
    }

    public track(resource: any) {
        if (resource.dispose || resource instanceof THREE.Object3D) {
            this.resources.add(resource);
        }
        return resource;
    }

    public untrack(resource: any) {
        this.resources.delete(resource);
    }

    public dispose() {
        for (const resource of this.resources) {
            if (resource instanceof THREE.Object3D) {
                if (resource.parent) {
                    resource.parent.remove(resource);
                }
            }
            if (resource.dispose) {
                resource.dispose();
            }
        }
        this.resources.clear();
    }
}