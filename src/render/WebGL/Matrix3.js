import * as MathUtil from '../../utils/MathUtil';
import Matrix from './Matrix';

//translation -> rotation -> scal
const M3_IDENTITY = [1,0,0,
                     0,1,0,
                     0,0,1];

export default class Matrix3 extends Matrix {
    constructor(data = M3_IDENTITY) {
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
        let rad = math.degToRad(rotationDegree);
        let c = Math.cos(rad);
        let s = Math.sin(rad);
        this.m[0] = c;
        this.m[1] = -s;
        this.m[3] = s;
        this.m[4] = c;
    }

    copy() {
        return new Matrix3(this.m.slice(0, this.m.length));
    }

    add(m2) {

    }

    multiply(m2) {
        this.m[0] = this.m[0] * m2.m[0] + this.m[3] * m2.m[1] + this.m[6] * m2.m[2];
        this.m[1] = this.m[1] * m2.m[0] + this.m[4] * m2.m[1] + this.m[7] * m2.m[2];
        this.m[2] = this.m[2] * m2.m[0] + this.m[5] * m2.m[1] + this.m[8] * m2.m[2];

        this.m[3] = this.m[0] * m2.m[3] + this.m[3] * m2.m[4] + this.m[6] * m2.m[5];
        this.m[4] = this.m[1] * m2.m[3] + this.m[4] * m2.m[4] + this.m[7] * m2.m[5];
        this.m[5] = this.m[2] * m2.m[3] + this.m[5] * m2.m[4] + this.m[8] * m2.m[5];

        this.m[6] = this.m[0] * m2.m[6] + this.m[3] * m2.m[7] + this.m[6] * m2.m[8];
        this.m[7] = this.m[1] * m2.m[6] + this.m[4] * m2.m[7] + this.m[7] * m2.m[8];
        this.m[8] = this.m[2] * m2.m[6] + this.m[5] * m2.m[7] + this.m[8] * m2.m[8];
        return this;
    }
}