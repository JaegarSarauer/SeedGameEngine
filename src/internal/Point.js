/**
 * A point with x, y, z values.
 */
export default class Point {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    set(x = this.x, y = this.y, z = this.z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}