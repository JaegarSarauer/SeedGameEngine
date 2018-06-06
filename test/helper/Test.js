const log = require('./Log');
const TestManager = require('./TestManager');

class Test {
    constructor(name) {
        this.name = name;
        this.tests = [];
        TestManager.addTest(this);
    }

    run() {
        this.steps();
        let i = 0;
        log.info('[Running]: ' + this.name);
        while(i < this.tests.length) {
            if (this.tests[i].test()) {
                log.success('\t' + this.tests[i].name);
                i++;
            } else {
                log.error('\t' + this.tests[i].name);
                break;
            }
        }
        if (i >= this.tests.length) {
            log.success('[Success]: ' + this.name);
        } else {
            log.error('[Failed]: ' + this.name);
        }
    }

    steps() {
        throw 'Steps must be added to the test!';
    }

    addStep(testName, functionStep) {
        this.tests.push({
            name: testName,
            test: functionStep,
        });
    }
}

module.exports.Test = Test;