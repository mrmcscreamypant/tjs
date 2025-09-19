import Engine from "./Engine";

export enum Keys {
    LEFT_ARROW = "ArrowLeft",
    RIGHT_ARROW = "ArrowRight",
    UP_ARROW = "ArrowUp",
    DOWN_ARROW = "ArrowDown",
    W = "w",
    A = "a",
    S = "s",
    D = "d",
}

export default class Input {
    private readonly engine: Engine;

    private pressedKeys: string[] = [];

    constructor(engine: Engine) {
        this.engine = engine;

        this.engine.ctx.addEventListener("keydown", (e: KeyboardEvent)=>{
            this.pressedKeys.push(e.key);
        })

        this.engine.ctx.addEventListener("keyup", (e: KeyboardEvent)=>{
            this.pressedKeys = this.pressedKeys.filter((k)=>(k!==e.key));
        })
    }

    public getKey(key: Keys): boolean {
        return this.pressedKeys.includes(key);
    }
}