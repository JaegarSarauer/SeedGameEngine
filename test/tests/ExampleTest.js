const log = require('../helper/Log');
const t = require('../helper/Test');

/**
 * @test Example test.
 */
class ExampleTest extends t.Test {
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
        this.addStep('Simple Assert 3', () => {
            this.value += 100;
            return this.value < 222;
        });
    }
}

module.exports = new ExampleTest();