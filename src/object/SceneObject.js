import GameObject from "./GameObject";
import SceneManager from '../manager/SceneManager';

export default class SceneObject extends GameObject {
    constructor(x = 0, y = 0, z = 0, scaleX = 1, scaleY = 1, rotation = 0) {
        super(x, y, z, scaleX, scaleY, rotation);
        this.deregister = SceneManager.registerSceneObject(this);
    }

    onEnd() {
        this.deregister();
    }
}