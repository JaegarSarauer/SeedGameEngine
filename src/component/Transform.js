import Component from './Component';
import Point from '../internal/Point';

export default class Transform extends Component {
    constructor(x = 0, y = 0, z = 0, scaleX = 1, scaleY = 1, rotation = 0) {
        super(true);
        this.className='Transform';
        this.position = new Point(x, y, z);
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.rotation = 0;
    }

    setPosition(x = this.position.x, y = this.position.y, z = this.position.z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    setScale(scaleX = this.scaleX, scaleY = this.scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    translate(x = 0, y = 0, z = 0) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
    }

    scale(scaleX = 0, scaleY = 0) {
        this.scaleX += scaleX;
        this.scaleY += scaleY;
    }

    rotate(rotation) {
        this.rotation += rotation;
    }
}