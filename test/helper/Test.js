import {success, error, info} from './Log';
import TestManager from './TestManager';

export default class Test {
    constructor(name, totalTests) {
        this.name = name;
        this.tests = [];
        this.testsRun = 0;
        this.testFailed = false;
        this.testStart = 0;
        this.totalTests = totalTests;
        this.testComplete = false;
        TestManager.addTest(this);
    }

    run() {
        info('[Running]: ' + this.name);
        this.testStart = performance.now();
        this.steps();
        this.runSteps();
    }

    equals(num1, num2, precision = 12) {
        return (parseFloat(num1).toFixed(precision) === parseFloat(num2).toFixed(precision));
    }

    steps() {
        throw 'Steps must be added to the test!';
    }

    getResult(result, test) {
        let tEnd = performance.now();
        let time = (tEnd - test.tStart).toFixed(2);
        if (result) {
            success('\t' + test.name + " || Time: " + (time < 1 ? '< 1' : time) + 'ms');
        } else {
            this.testFailed = true;
            error('\t' + test.name + " || Time: " + (time < 1 ? '< 1' : time) + 'ms');
        }
        this.testsRun++;
        if (this.testsRun >= this.totalTests) {
            if (this.testFailed) {
                error('[Fail]: ' + this.name + " || Time: " + (time < 1 ? '< 1' : time) + 'ms');
            } else {
                success('[Success]: ' + this.name + " || Time: " + (time < 1 ? '< 1' : time) + 'ms');
            }
            this.testComplete = true;
        }
    }

    addStep(testName, functionStep) {
        let test = {
            name: testName,
            tStart: performance.now(),
            functionStep,
        }

        this.tests.push(test);
    }

    runSteps() {
        let interval = setInterval(() => {
            if (this.testsRun < this.totalTests) {
                let test = this.tests.shift();
                if (test == null)
                    return;
                let result = test.functionStep();
                if (typeof result == 'object') {
                    result.then((r) => {
                        this.getResult(r, test);
                    });
                } else {
                    this.getResult(result, test);
                }
            } else {
                this.cleanup();
                clearTimeout(interval);
            }
        }, 10);
    }

    cleanup() {}
}