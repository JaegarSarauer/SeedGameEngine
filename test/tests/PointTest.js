import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import Point from '../../src/internal/Point';

export default class PointTest extends Test {
    constructor() {
        super('Point Test', 6); 
    }
    
    steps() {
        this.addStep('New Point 10,10,10 add 20,20,20', () => {
            let p = new Point(10, 10, 10);
            p.add(20, 20, 20);
            return p.x == 30 && p.y == 30 && p.z == 30;
        });

        this.addStep('New Point 10,10,10 subtract 20,20,20', () => {
            let p = new Point(10, 10, 10);
            p.subtract(20, 20, 20);
            return p.x == -10 && p.y == -10 && p.z == -10;
        });

        this.addStep('New Point 10,10,10 divide 20,20,20', () => {
            let p = new Point(10, 10, 10);
            p.divide(20, 20, 20);
            return p.x == 0.5 && p.y == 0.5 && p.z == 0.5;
        });

        this.addStep('New Point 10,10,10 multiply 20,20,20', () => {
            let p = new Point(10, 10, 10);
            p.multiply(20, 20, 20);
            return p.x == 200 && p.y == 200 && p.z == 200;
        });

        this.addStep('New Point 10,10,10 and -5,-5,-5 length of', () => {
            let p = new Point(10, 10, 10);
            let p2 = new Point(-5, -5, -5);
            return this.equals(p.length(), 17.320508075688775, 12) && this.equals(p2.length(), 8.660254037844387, 12);
        });

        this.addStep('New Point 10,10,10 and -5,-5,-5 normalized', () => {
            let p = new Point(10, 10, 10);
            let p2 = new Point(-5, -5, -5);
            p.normalize();
            p2.normalize();
            return this.equals(p.x, 0.577350269189627, 12) && this.equals(p2.x, -0.577350269189627, 12);
        });
    }
}