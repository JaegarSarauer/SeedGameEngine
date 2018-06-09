import Point from './Point';

export default class Bounds {
    constructor(x, y, w, h) {
        this.p1 = new Point(x, y);
        this.p2 = new Point(w, h);
    }

    set(x, y, w, h) {
        this.p1.set(x, y);
        this.p2.set(w, h);
    }

    isInBounds(point) {
        return (point.x >= this.p1.x && point.x <= this.p2.x
                && point.y >= this.p1.y && point.y <= this.p2.y
                && point.z >= this.p1.z && point.z <= this.p2.z);
    }
}