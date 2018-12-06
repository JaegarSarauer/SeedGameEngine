import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import Color from '../../src/internal/Color';

export default class ColorTest extends Test {
    constructor() {
        super('Color Test', 2); 
    }
    
    steps() {
        this.addStep('Build and Set Color', () => {
            let c = new Color(.5, .5, .5, 1);
            c.set(0.3, 0.3, 0.4, 0.8);
            return this.equals(c.color[0], 0.3) && this.equals(c.color[1], 0.3) && this.equals(c.color[2], 0.4, 10) && this.equals(c.color[3], 0.8, 10);
        });

        this.addStep('Build and Check Out of Bounds Color', () => {
            let c = new Color(-2.3, 2.3, 2.4, 2.8, 1);
            return this.equals(c.color[0], 0) && this.equals(c.color[1], 1) && this.equals(c.color[2], 1) && this.equals(c.color[3], 1);
        });
    }
}