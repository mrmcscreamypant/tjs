import Engine from "./Engine";

export enum Keys {
    LEFT_ARROW = "ArrowLeft",
}

export default class Input {
    private readonly engine: Engine;

    private pressedKeys: string[] = [];

    constructor(engine: Engine) {
        this.engine = engine;

        this.engine.ctx.addEventListener("keydown", (e)=>{
            this.pressedKeys.push(e.key);
        })
    }

    public getKey(key: Keys): boolean {
        return this.pressedKeys.includes(key);
    }
}