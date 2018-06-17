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

    divide(divX, divY = divX, divZ = divX) {
        this.x /= divX;
        this.y /= divY;
        this.z /= divZ;
    }

    multiply(multiX, multiY = multiX, multiZ = multiX) {
        this.x *= multiX;
        this.y *= multiY;
        this.z *= multiZ;
    }

    add(addX, addY = addX, addZ = addX) {
        this.x += addX;
        this.y += addY;
        this.z += addZ;
    }

    subtract(subX, subY = subX, subZ = subX) {
        this.x -= subX;
        this.y += subY;
        this.z += subZ;
    }

    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    normalize() {
        let len = this.length();
        if (len !== 0)
            this.divide(len);
    }
}