import Component from './Component';
import Point from '../internal/Point';

/**
 * A component all GameObjects are given by default on instantiation.
 * 
 * Transform components are unique to the object, meaning there cannot be more than
 * one Transform on a GameObject.
 * 
 * Transforms keep track of GameObject position, scale (size), rotation, and 
 * origin offset. These should be changes with their respective setters, and not directly,
 * to ensure the correct components are notified of these changes.
 * 
 * TODO: Make rotation work on 3 axis like position and scale.
 * TODO: Change the updates and setters of the position/scale/rotation to use funcions in their base
 * definitions and remove the wrappers here to reduce code.
 */
export default class Transform extends Component {
    constructor(position = new Point(0, 0, 0), scale = new Point(1, 1, 1), rotation = 0) {
        super(true);
        this.className='Transform';
        this._position = position;
        this._rotation = rotation;
        this._scale = scale;
        this._originOffset = new Point(0, 0, 0);
        this.renderable = null;
    }

    /**
     * Sets the Transforms position.
     * 
     * @param {number} x X position. Defaults to current X position.
     * @param {number} y Y position. Defaults to current Y position.
     * @param {number} z Z position. Defaults to current Z position.
     */
    setPosition(x = this._position.x, y = this._position.y, z = this._position.z) {
        this._position.set(x, y, z);
        if (this.renderable != null) {
            this.renderable.setPosition(this._position);
        }
    }

    /**
     * Triggers between two types of regularly used origin points. 
     * 
     * Origin points are used with Renderables and other components to offset the origin different from the Transform's position.
     * 
     * "Center": (-0.5, -0.5, -0.5) centered to the Tranform's position, and "Default": (0, 0, 0), beginning at the top left of the Transform.
     * 
     * @param {boolean} center "Center" if true, "Default" if false.
     */
    centerOrigin(center = true) {
        if (center) {
            this.setOriginOffset(-0.5, -0.5, -0.5);
        } else {
            this.setOriginOffset(0, 0, 0);
        }
    }

    /**
     * Sets the origin offset position. 
     * 
     * If you want an object to exist at a 
     * position, but do something else (like drawing, animations) 
     * in a relative position the the Tranform, use this to change the 
     * offset from the Transfrom.
     * 
     * (0, 0, 0) would be top left of the transform. 
     * (-0.5, -0.5, -0.5) would be center of the transform. 
     * (-1, -1, -1) would be bottom right of transform.
     * 
     * Parameters default to their current values.
     * 
     * @param {number} x X axis offset. Defaults to current origin offset X.
     * @param {number} y Y axis offset. Defaults to current origin offset Y.
     * @param {number} z Z axis offset. Defaults to current origin offset Z.
     */
    setOriginOffset(x = this._originOffset.x, y = this._originOffset.y, z = this._originOffset.z) {
        this._originOffset.set(x, y, z);
        if (this.renderable != null) {
            this.renderable.setOriginOffset(this._originOffset);
        }
    }

    /**
     * Rotates the transform to face a different direction.
     * 
     * TODO: implement more than z axis rotation.
     * 
     * @param {number} rotation Rotation around the Z axis (in degrees).
     */
    setRotation(rotation) {
        this._rotation = rotation;
        if (this.renderable != null) {
            this.renderable.setRotation(this._rotation);
        }
    }

    /**
     * 
     * @param {number} scaleX X scale from 1. Defaults to current scale X.
     * @param {number} scaleY Y scale from 1. Defaults to current scale Y.
     * @param {number} scaleZ Z scale from 1. Defaults to current scale Z.
     */
    setScale(scaleX = this.scaleX, scaleY = this.scaleY, scaleZ = this.scaleZ) {
        this._scale.set(scaleX, scaleY, scaleZ);
        if (this.renderable != null) {
            this.renderable.setScale(this._scale);
        }
    }

    /**
     * Adds the parameters of this function to the Transforms position.
     * 
     * @param {number} x X position. Defaults to 0.
     * @param {number} y Y position. Defaults to 0.
     * @param {number} z Z position. Defaults to 0.
     */
    translate(x = 0, y = 0, z = 0) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
        if (this.renderable != null) {
            this.renderable.setPosition(this._position);
        }
    }

    /**
     * Adds the rotation parameter to the current Transform rotation.
     * 
     * @param {number} rotation Rotation to add.
     */
    rotate(rotation) {
        this._rotation += rotation;
        if (this.renderable != null) {
            this.renderable.setRotation(this._rotation);
        }
    }

    /**
     * Adds the parameters of this function to the Transforms scale.
     * 
     * @param {number} scaleX X scale. Defaults to 0.
     * @param {number} scaleY Y scale. Defaults to 0.
     * @param {number} scaleZ Z scale. Defaults to 0.
     */
    scale(scaleX = 0, scaleY = 0, scaleZ = 0) {
        this._scale.x += scaleX;
        this._scale.y += scaleY;
        this._scale.z += scaleZ;
        if (this.renderable != null) {
            this.renderable.setScale(this._scale);
        }
    }

    /**
     * @returns {Point} The transform's position.
     */
    getPosition() {
        return Point.copy(this._position);
    }

    /**
     * @returns {Point} The transform's scale.
     */
    getScale() {
        return Point.copy(this._scale);
    }

    /**
     * @returns {number} The transform's rotation.
     */
    getRotation() {
        return Point.copy(this._rotation);
    }

    /**
     * @returns {Point} The transform's origin offset.
     */
    getOriginOffset() {
        return Point.copy(this._originOffset);
    }
}