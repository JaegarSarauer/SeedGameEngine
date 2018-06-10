import * as MathUtil from '../../utils/MathUtil';
import Matrix from './Matrix';


export default class Matrix3 extends Matrix {
    constructor(data = [1,0,0,0,1,0,0,0,1]) {
        super();
        //default x = 0, y = 0, scaleXY = 1, rotation = 0
        this.m = data;
        return this;
    }

    setPosition(x, y) {
        this.m[6] = x;
        this.m[7] = y;
    }

    setScale(x, y) {
        this.m[0] = x;
        this.m[4] = y;
    }

    setRotation(rotationDegree) {
        let rad = MathUtil.degToRad(rotationDegree);
        let c = Math.cos(rad);
        let s = Math.sin(rad);
        this.m[0] = c;
        this.m[1] = -s;
        this.m[3] = s;
        this.m[4] = c;
    }

    static copy(m1) {
        return new Matrix3(m1.m.slice(0, m1.m.length));
    }

    add(m2) {

    }

    static projection(w, h) {
        return new Matrix3([
        2 / w, 0, 0,
        0, -2 / h, 0,
        -1, 1, 1]);
    }

    multiply(m2) {
        let mat = new Matrix3();
        mat.m[0] = (this.m[0] * m2.m[0]) + (this.m[3] * m2.m[1]) + (this.m[6] * m2.m[2]);
        mat.m[1] = (this.m[1] * m2.m[0]) + (this.m[4] * m2.m[1]) + (this.m[7] * m2.m[2]);
        mat.m[2] = (this.m[2] * m2.m[0]) + (this.m[5] * m2.m[1]) + (this.m[8] * m2.m[2]);

        mat.m[3] = (this.m[0] * m2.m[3]) + (this.m[3] * m2.m[4]) + (this.m[6] * m2.m[5]);
        mat.m[4] = (this.m[1] * m2.m[3]) + (this.m[4] * m2.m[4]) + (this.m[7] * m2.m[5]);
        mat.m[5] = (this.m[2] * m2.m[3]) + (this.m[5] * m2.m[4]) + (this.m[8] * m2.m[5]);

        mat.m[6] = (this.m[0] * m2.m[6]) + (this.m[3] * m2.m[7]) + (this.m[6] * m2.m[8]);
        mat.m[7] = (this.m[1] * m2.m[6]) + (this.m[4] * m2.m[7]) + (this.m[7] * m2.m[8]);
        mat.m[8] = (this.m[2] * m2.m[6]) + (this.m[5] * m2.m[7]) + (this.m[8] * m2.m[8]);
        return mat;
    }
}