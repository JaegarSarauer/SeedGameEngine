import * as MathUtil from '../../utils/MathUtil';
import Matrix from './Matrix';


export default class Matrix3 extends Matrix {
    constructor(data = [1,0,0,0,1,0,0,0,1]) {
        super();
        //default x = 0, y = 0, scaleXY = 1, rotation = 0
        this.m = data;
        return this;
    }

    /**
     * Sets the translation positions of the matrix with x, y points. This overwrites the values and 
     * does not adjust the parameters to work relative to the rest of the matrix values.
     * 
     * @param {number} x X position.
     * @param {number} y Y position.
     */
    setPosition(x, y) {
        this.m[6] = x;
        this.m[7] = y;
    }

    /**
     * Sets the scale values of the matrix with w, h values. This overwrites the values and 
     * does not adjust the parameters to work relative to the rest of the matrix values.
     * 
     * @param {number} x X scale.
     * @param {number} y Y scale.
     */
    setScale(x, y) {
        this.m[0] = x;
        this.m[4] = y;
    }

    /**
     * Sets the matrix rotation values to rotate an object around the z axis. This overwrites the values and 
     * does not adjust the parameters to work relative to the rest of the matrix values.
     * 
     * @param {number} rotationDegree 
     */
    setRotation(rotationDegree) {
        let rad = MathUtil.degToRad(rotationDegree);
        let c = Math.cos(rad);
        let s = Math.sin(rad);
        this.m[0] = c;
        this.m[1] = -s;
        this.m[3] = s;
        this.m[4] = c;
    }

    /**
     * Makes a copy of the matrix3. This is a static function and can be called
     * from Matrix3 prototype.
     * 
     * @param {Matrix3} matrix The matrix3 to copy.
     */
    static copy(matrix) {
        return new Matrix3(matrix.m.slice(0, matrix.m.length));
    }

    /**
     * Adds a matrix to this matrix.
     * 
     * @param {Matrix3} m3 The matrix to add to this matrix.
     */
    add(m3) {
        throw 'unimplemented';
    }

    /**
     * Static function which returns a projection matrix converting the
     * top left coordinates to 0, 0, and bottom right to w, h.
     * 
     * (Converted from -1, -1 top left to 1, 1 bottom right.)
     * 
     * @param {number} w Width of the projection.
     * @param {number} h Height of the projection.
     */
    static projection(w, h) {
        return new Matrix3([
        2 / w, 0, 0,
        0, -2 / h, 0,
        -1, 1, 1]);
    }

    /**
     * Multiplies a matrix into this matrix.
     * 
     * @param {Matrix3} m3 The matrix to multiply to this matrix.
     */
    multiply(m3) {
        let mat = new Matrix3();
        mat.m[0] = (this.m[0] * m3.m[0]) + (this.m[3] * m3.m[1]) + (this.m[6] * m3.m[2]);
        mat.m[1] = (this.m[1] * m3.m[0]) + (this.m[4] * m3.m[1]) + (this.m[7] * m3.m[2]);
        mat.m[2] = (this.m[2] * m3.m[0]) + (this.m[5] * m3.m[1]) + (this.m[8] * m3.m[2]);

        mat.m[3] = (this.m[0] * m3.m[3]) + (this.m[3] * m3.m[4]) + (this.m[6] * m3.m[5]);
        mat.m[4] = (this.m[1] * m3.m[3]) + (this.m[4] * m3.m[4]) + (this.m[7] * m3.m[5]);
        mat.m[5] = (this.m[2] * m3.m[3]) + (this.m[5] * m3.m[4]) + (this.m[8] * m3.m[5]);

        mat.m[6] = (this.m[0] * m3.m[6]) + (this.m[3] * m3.m[7]) + (this.m[6] * m3.m[8]);
        mat.m[7] = (this.m[1] * m3.m[6]) + (this.m[4] * m3.m[7]) + (this.m[7] * m3.m[8]);
        mat.m[8] = (this.m[2] * m3.m[6]) + (this.m[5] * m3.m[7]) + (this.m[8] * m3.m[8]);
        return mat;
    }
}