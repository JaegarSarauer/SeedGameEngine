import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import Matrix3 from '../../src/render/WebGL/Matrix3';

export default class Matrix3Test extends Test {
    constructor() {
        super('Matrix3 Test (Checking all indexes)', 5); 
    }
    
    steps() {
        this.addStep('Set Position', () => {
            let m = new Matrix3();
            m.setPosition(10, 8);
            let res = true;
            res = res && this.equals(m.m[0], 1);
            res = res && this.equals(m.m[1], 0);
            res = res && this.equals(m.m[2], 0);
            res = res && this.equals(m.m[3], 0);
            res = res && this.equals(m.m[4], 1);
            res = res && this.equals(m.m[5], 0);
            res = res && this.equals(m.m[6], 10);
            res = res && this.equals(m.m[7], 8);
            res = res && this.equals(m.m[8], 1);
            return res;
        });

        this.addStep('Set Scale', () => {
            let m = new Matrix3();
            m.setScale(10, 8);
            let res = true;
            res = res && this.equals(m.m[0], 10);
            res = res && this.equals(m.m[1], 0);
            res = res && this.equals(m.m[2], 0);
            res = res && this.equals(m.m[3], 0);
            res = res && this.equals(m.m[4], 8);
            res = res && this.equals(m.m[5], 0);
            res = res && this.equals(m.m[6], 0);
            res = res && this.equals(m.m[7], 0);
            res = res && this.equals(m.m[8], 1);
            return res;
        });

        this.addStep('Set Rotation', () => {
            let m = new Matrix3();
            m.setRotation(100);
            let res = true;
            res = res && this.equals(m.m[0], -0.17364817766693);
            res = res && this.equals(m.m[1], -0.984807753012208);
            res = res && this.equals(m.m[2], 0);
            res = res && this.equals(m.m[3], 0.984807753012208);
            res = res && this.equals(m.m[4], -0.17364817766693);
            res = res && this.equals(m.m[5], 0);
            res = res && this.equals(m.m[6], 0);
            res = res && this.equals(m.m[7], 0);
            res = res && this.equals(m.m[8], 1);
            return res;
        });

        this.addStep('Copy', () => {
            let m = new Matrix3();
            m.setPosition(10, 10);
            let m2 = Matrix3.copy(m);
            m2.setPosition(-5, -5);

            let res = true;
            res = res && this.equals(m.m[0], 1);
            res = res && this.equals(m.m[1], 0);
            res = res && this.equals(m.m[2], 0);
            res = res && this.equals(m.m[3], 0);
            res = res && this.equals(m.m[4], 1);
            res = res && this.equals(m.m[5], 0);
            res = res && this.equals(m.m[6], 10);
            res = res && this.equals(m.m[7], 10);
            res = res && this.equals(m.m[8], 1);
            res = res && this.equals(m2.m[0], 1);
            res = res && this.equals(m2.m[1], 0);
            res = res && this.equals(m2.m[2], 0);
            res = res && this.equals(m2.m[3], 0);
            res = res && this.equals(m2.m[4], 1);
            res = res && this.equals(m2.m[5], 0);
            res = res && this.equals(m2.m[6], -5);
            res = res && this.equals(m2.m[7], -5);
            res = res && this.equals(m2.m[8], 1);
            return res;
        });

        this.addStep('Multiply Matricies', () => {
            let m1 = new Matrix3([4, 0, 0, 0, 3, 0, -10, 5, 1]);
            let m2 = new Matrix3([2, 0, 0, 0, 1, 0, 40, -10, 1]);
            let m3 = m1.multiply(m2);
            let res = true;
            res = res && this.equals(m3.m[0], 8);
            res = res && this.equals(m3.m[1], 0);
            res = res && this.equals(m3.m[2], 0);
            res = res && this.equals(m3.m[3], 0);
            res = res && this.equals(m3.m[4], 3);
            res = res && this.equals(m3.m[5], 0);
            res = res && this.equals(m3.m[6], 150);
            res = res && this.equals(m3.m[7], -25);
            res = res && this.equals(m3.m[8], 1);
            return res;
        });
    }
}