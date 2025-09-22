import { Schema, type } from "@colyseus/schema";

export default class Vector3State extends Schema {
    @type("number") x: number;
    @type("number") y: number;
    @type("number") z: number;

    constructor(x: number, y: number, z: number) {
        super();
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
