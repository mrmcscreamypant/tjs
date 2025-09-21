import { WeaponState } from "./BattleState";
import { type } from '@colyseus/schema';

export class DebugWeaponState extends WeaponState {
    @type("number") age: number = 0;

    init() {
        this.position = this.owner.position.clone();
    }

    public tick(): boolean {
        this.position.y += 0.1;
        this.age += 1;
        if (this.age > 10) {
            return false;
        }
        return true;
    }
}