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
     * 
     * @param {number} x X position.
     * @param {number} y Y position.
     * @param {number} z Z position.
     */
    setPosition(x = this._position.x, y = this._position.y, z = this._position.z) {
        this._position.set(x, y, z);
        if (this.renderable != null) {
            this.renderable.setPosition(this._position);
        }
    }

    centerOrigin(center = true) {
        if (center) {
            this.setOriginOffset(-0.5, -0.5, -0.5);
        } else {
            this.setOriginOffset(0, 0, 0);
        }
    }

    setOriginOffset(x = this._originOffset.x, y = this._originOffset.y, z = this._originOffset.z) {
        this._originOffset.set(x, y, z);
        if (this.renderable != null) {
            this.renderable.setOriginOffset(this._originOffset);
        }
    }

    setRotation(rotation) {
        this._rotation = rotation;
        if (this.renderable != null) {
            this.renderable.setRotation(this._rotation);
        }
    }

    setScale(scaleX = this.scaleX, scaleY = this.scaleY, scaleZ = this.scaleZ) {
        this._scale.set(scaleX, scaleY, scaleZ);
        if (this.renderable != null) {
            this.renderable.setScale(this._scale);
        }
    }

    translate(x = 0, y = 0, z = 0) {
        this._position.x += x;
        this._position.y += y;
        this._position.z += z;
        if (this.renderable != null) {
            this.renderable.setPosition(this._position);
        }
    }

    rotate(rotation) {
        this._rotation += rotation;
        if (this.renderable != null) {
            this.renderable.setRotation(this._rotation);
        }
    }

    scale(scaleX = 0, scaleY = 0, scaleZ = 0) {
        this._scale.x += scaleX;
        this._scale.y += scaleY;
        this._scale.z += scaleZ;
        if (this.renderable != null) {
            this.renderable.setScale(this._scale);
        }
    }

    getPosition() {
        return this._position;
    }

    getScale() {
        return this._scale;
    }

    getRotation() {
        return this._rotation;
    }

    getOriginOffset() {
        return this._originOffset;
    }
}