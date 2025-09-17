import * as THREE from 'three';

type Resource = any;

export default class ResourceTracker {
    private resources: Set<Resource>;

    public constructor() {
        this.resources = new Set();
    }

    public track<Resource>(resource: Resource) {
        if (resource || resource instanceof THREE.Object3D) {
            this.resources.add(resource);
        }
        return resource;
    }

    public untrack<Resource>(resource: Resource) {
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