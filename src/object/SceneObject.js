import GameObject from "./GameObject";
import SceneManager from '../manager/SceneManager';

export default class SceneObject extends GameObject {
    constructor() {
        this.deregister = SceneManager.registerSceneObject(this);
    }

    onEnd() {
        this.deregister();
    }
}