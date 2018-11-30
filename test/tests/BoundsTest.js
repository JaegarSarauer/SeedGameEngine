import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import Bounds from '../../src/internal/Bounds';
import Point from '../../src/internal/Point';

export default class BoundsTest extends Test {
    constructor() {
        super('Bounds Test', 2); 
    }
    
    steps() {
        this.addStep('Bounds Set', () => {
            let b = new Bounds(2, 2, 5, 5);
            b.set(5, 5, 10, 10);
            return this.equals(b.p1.x, 5, 10) && this.equals(b.p1.y, 5, 10) && this.equals(b.p2.x, 10, 10) && this.equals(b.p2.y, 10, 10);
        });

        this.addStep('Check if points in/out bounds.', () => {
            let p1 = new Point(0, 0);
            let p2 = new Point(-5, -5);
            let p3 = new Point(5, 5);
            let b = new Bounds(-3, -3, 3, 3);
            return b.isInBounds(p1) && !b.isInBounds(p2) && !b.isInBounds(p3);
        });
    }
}