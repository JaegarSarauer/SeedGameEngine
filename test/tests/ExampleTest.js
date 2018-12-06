import log from '../helper/Log';
import Test from '../helper/Test';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class ExampleTest extends Test {
    constructor() {
        super('Example Test', 3); 

        this.value = 4;
    }
    
    steps() {
        this.addStep('Simple Assert 1', () => {
            this.value += 100;
            return this.value < 200;
        });
        this.addStep('Simple Assert 2', () => {
            this.value += 100;
            return this.value < 222;
        });
        this.addStep('Simple Assert 3 (should fail)', () => {
            this.value += 100;
            return this.value < 222;
        });
    }
}