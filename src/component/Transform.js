import Component from './Component';
import Point from '../internal/Point';

export default class Transform extends Component {
    constructor(x = 0, y = 0, z = 0, scaleX = 1, scaleY = 1, scaleZ = 1, rotation = 0) {
        super(true);
        this.className='Transform';
        this.position = new Point(x, y, z);
        this.rotation = rotation;
        this.scaleSize = new Point(scaleX, scaleY, scaleZ);
        this.renderable = null;
    }

    setPosition(x = this.position.x, y = this.position.y, z = this.position.z) {
        this.position.set(x, y, z);
        if (this.renderable != null) {
            this.renderable.updatePosition(this.position);
        }
    }

    setRotation(rotation) {
        this.rotation = rotation;
        if (this.renderable != null) {
            this.renderable.updateRotation(this.rotation);
        }
    }

    setScale(scaleX = this.scaleX, scaleY = this.scaleY, scaleZ = this.scaleZ) {
        this.scaleSize.set(scaleX, scaleY, scaleZ);
        if (this.renderable != null) {
            this.renderable.updateScale(this.scaleSize);
        }
    }

    translate(x = 0, y = 0, z = 0) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
        if (this.renderable != null) {
            this.renderable.updatePosition(this.position);
        }
    }

    rotate(rotation) {
        this.rotation += rotation;
        if (this.renderable != null) {
            this.renderable.updateRotation(this.rotation);
        }
    }

    scale(scaleX = 0, scaleY = 0, scaleZ = 0) {
        this.scaleSize.x += scaleX;
        this.scaleSize.y += scaleY;
        this.scaleSize.z += scaleZ;
        if (this.renderable != null) {
            this.renderable.updateScale(this.scaleSize);
        }
    }

    getPosition() {
        return this.position;
    }

    getScale() {
        return this.scaleSize;
    }

    getRotation() {
        return this.rotation;
    }
}