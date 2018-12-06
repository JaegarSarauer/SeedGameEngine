import Point from './Point';

/**
 * Two points which represent a bounding square.
 * 
 * TODO: Add z index for 3D.
 */
export default class Bounds {
    /**
     * 
     * @param {number} x The x position of the bounding box. (x1)
     * @param {number} y The y position of the bounding box. (y1)
     * @param {number} w The end x position, or width, of the bounding box. (x2)
     * @param {number} h The end x position, or height, of the bounding box. (y2)
     */
    constructor(x, y, w, h) {
        this.p1 = new Point(x, y);
        this.p2 = new Point(w, h);
    }

    /**
     * Sets the bounding box to a new position.
     * 
     * @param {number} x The x position of the bounding box. (x1)
     * @param {number} y The y position of the bounding box. (y1)
     * @param {number} w The end x position, or width, of the bounding box. (x2)
     * @param {number} h The end x position, or height, of the bounding box. (y2)
     */
    set(x, y, w, h) {
        this.p1.set(x, y);
        this.p2.set(w, h);
    }

    /**
     * Checks to see if the point [parameter 0] is within bounds.
     * 
     * @param {Point} point Point to check within bounds.
     */
    isInBounds(point) {
        return (point.x >= this.p1.x && point.x <= this.p2.x
                && point.y >= this.p1.y && point.y <= this.p2.y);
    }
}