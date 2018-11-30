import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { DOMManager } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class DOMManagerTest extends Test {
    constructor() {
        super('DOM Manager Test', 2); 
        this.loader = null;
    }
    
    steps() {
        this.addStep('Load and Check for Canvas', () => {
            return DOMManager.GL != null;
        });

        this.addStep('Adjust Canvas Size.', () => {
            DOMManager.adjust();
            return true;
        });
    }
}