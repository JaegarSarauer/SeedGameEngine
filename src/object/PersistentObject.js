import GameObject from "./GameObject";
import PersistentManager from "../manager/PersistentManager";

export default class PersistentObject extends GameObject {
    constructor(x = 0, y = 0, z = 0, scaleX = 1, scaleY = 1, rotation = 0) {
        super(x, y, z, scaleX, scaleY, rotation);
        this.deregister = PersistentManager.registerSceneObject(this);
    }

    onEnd() {
        this.deregister();
    }
}