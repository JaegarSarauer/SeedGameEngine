import GameObject from "./GameObject";
import PersistentManager from "../manager/PersistentManager";

/**
 * A GameObject which exists across scenes. 
 * 
 * Objects which derive PersistentObjects do not belong to any one scene. 
 * If the derived object is intended to be rendered cross scene, the renderable component's
 * viewports must be reassigned on scene changes.
 */
export default class PersistentObject extends GameObject {
    /**
     * Default position, size and rotation of the Object.
     * 
     * @param {Point} position A point of creation in the world.
     * @param {Point} size A point representing scale of the object.
     * @param {number} rotation A number representing angular rotation (in degrees).
     */
    constructor(position = new Point(0, 0, 0), size = new Point(32, 32, 1), rotation = 0) {
        super(position, size, rotation);
        this.deregister = PersistentManager.registerPersistentObject(this);
    }
}