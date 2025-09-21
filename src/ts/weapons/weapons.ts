import Debug from "./Debug";
import Weapon from "./Weapon";

export enum Weapons {
    DEBUG = "debug"
}

const WeaponsMap: Record<string, any> = {
    debug: Debug,
};

export default WeaponsMap;