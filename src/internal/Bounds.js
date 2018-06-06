import Point from './Point';

export default class Bounds {
    constructor(p1 = new Point(), p2 = new Point()) {
        this.p1 = p1;
        this.p2 = p2;
    }

    isInBounds(point) {
        return (point.x >= this.p1.x && point.x <= this.p2.x
                && point.y >= this.p1.y && point.y <= this.p2.y
                && point.z >= this.p1.z && point.z <= this.p2.z);
    }
}