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
        /**
         * {number} X position of the point.
         */
        this.x = x;

        /**
         * {number} Y position of the point.
         */

        this.y = y;
        /**
         * {number} Z position of the point.
         */
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

    /**
     * Returns a copy of a point.
     * 
     * @param {Point} point Point to copy.
     */
    static copy(point) {
        return new Point(point.x, point.y, point.z);
    }

    /**
     * Divides the point by a number. The first parameter will define all x, y, z values for division
     * if the 2nd and 3rd are not specified.
     * 
     * @param {number} divX 
     * @param {number} divY 
     * @param {number} divZ 
     * 
     * @returns {Point} This point after modification.
     */
    divide(divX, divY = divX, divZ = divX) {
        this.x /= divX;
        this.y /= divY;
        this.z /= divZ;
        return this;
    }

    /**
     * Multiplies the point by a number. The first parameter will define all x, y, z values for multiplication
     * if the 2nd and 3rd are not specified.
     * 
     * @param {number} divX 
     * @param {number} divY 
     * @param {number} divZ 
     * 
     * @returns {Point} This point after modification.
     */
    multiply(multiX, multiY = multiX, multiZ = multiX) {
        this.x *= multiX;
        this.y *= multiY;
        this.z *= multiZ;
        return this;
    }

    /**
     * Adds the point by a number(s). The first parameter will define all x, y, z values for addition
     * if the 2nd and 3rd are not specified.
     * 
     * @param {number} divX 
     * @param {number} divY 
     * @param {number} divZ 
     * 
     * @returns {Point} This point after modification.
     */
    add(addX, addY = addX, addZ = addX) {
        this.x += addX;
        this.y += addY;
        this.z += addZ;
        return this;
    }

    /**
     * Subtracts the point by a number(s). The first parameter will define all x, y, z values for subtraction
     * if the 2nd and 3rd are not specified.
     * 
     * @param {number} divX 
     * @param {number} divY 
     * @param {number} divZ 
     * 
     * @returns {Point} This point after modification.
     */
    subtract(subX, subY = subX, subZ = subX) {
        this.x -= subX;
        this.y += subY;
        this.z += subZ;
        return this;
    }

    /**
     * Gets the length of this point as a vector. sqrt(x^2 + y^2 + z^2).
     */
    length() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    }

    /**
     * Normalizes this vector to a unit vector.
     */
    normalize() {
        let len = this.length();
        if (len !== 0)
            this.divide(len);
    }
}