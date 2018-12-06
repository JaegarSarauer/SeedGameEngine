import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { radToDeg, degToRad } from '../../src/utils/MathUtil';

export default class MathUtilsTest extends Test {
    constructor() {
        super('MathUtils Test', 2); 
    }
    
    steps() {
        this.addStep('130 Degrees to Radians to Degree', () => {
            let rad = degToRad(130);
            return radToDeg(rad) == 130;
        });

        this.addStep('1.5 Radians to Degree to Radians', () => {
            let deg = radToDeg(1.5);
            return degToRad(deg) == 1.5;
        });
    }
}