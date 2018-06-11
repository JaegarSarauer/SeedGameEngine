/**
 * A point with x, y, z values. It may also be referred to as a Vector.
 */
export default class Point {
    /**
     * An x, y, z point. Default parameters are set as 0.
     * 
     * @param {number} x X position of the point.
     * @param {number} y Y position of the point.
     * @param {number} z Z position of the point.
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    /**
     * Sets the point to a new x, y, z. Previous values are set
     * as default parameters.
     * 
     * @param {number} x X position of the point.
     * @param {number} y Y position of the point.
     * @param {number} z Z position of the point.
     */
    set(x = this.x, y = this.y, z = this.z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}