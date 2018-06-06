const log = require('../helper/Log');
const Test = require('../helper/Test');

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
class ExampleTest extends Test {
    constructor() {
        super('Example Test');

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

module.exports = new ExampleTest();