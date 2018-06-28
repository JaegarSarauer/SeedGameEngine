import GameObject from "./GameObject";
import SceneManager from '../manager/SceneManager';
import Point from '../internal/Point';

/**
 * A GameObject which exists only on the current active scene.
 * When this object is instantiated, it registers with the current active scene
 * through the SceneManager.
 * 
 */
export default class SceneObject extends GameObject {
    /**
     * Default position, size and rotation of the Object.
     * 
     * @param {Point} position A point of creation in the world.
     * @param {Point} size A point representing scale of the object.
     * @param {number} rotation A number representing angular rotation (in degrees).
     */
    constructor(position = new Point(0, 0, 0), size = new Point(32, 32, 1), rotation = 0) {
        super(position, size, rotation);
        this.deregister = SceneManager.registerSceneObject(this);
    }
}