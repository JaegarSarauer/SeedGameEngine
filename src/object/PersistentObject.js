import GameObject from "./GameObject";
import PersistentManager from "../manager/PersistentManager";

export default class PersistentObject extends GameObject {
    constructor() {
        this.deregister = PersistentManager.registerSceneObject(this);
    }

    onEnd() {
        this.deregister();
    }
}