import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { UIManager } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class UIManagerTest extends Test {
    constructor() {
        super('UI Manager Test', 2); 
        this.loader = null;
    }
    
    steps() {
        this.addStep('Add Style', () => {
            UIManager.addStyle('TestUI', {testVal: 66});
            return UIManager.getStyle('TestUI') != null;
        });

        this.addStep('Set and Get Current Style', () => {
            UIManager.setCurrentStyle('TestUI');
            return UIManager.getCurrentStyle().testVal == 66;
        });
    }
}