import {success, error, info} from './Log';
import TestManager from './TestManager';

export default class Test {
    constructor(name) {
        this.name = name;
        this.tests = [];
        TestManager.addTest(this);
    }

    run() {
        this.steps();
        let i = 0;
        info('[Running]: ' + this.name);
        while(i < this.tests.length) {
            let tStart = performance.now();
            let result = this.tests[i].test();
            if (result) {
                let tEnd = performance.now();
                success('\t' + this.tests[i].name + " Time: " + (tEnd - tStart));
                i++;
            } else {
                let tEnd = performance.now();
                error('\t' + this.tests[i].name + " Time: " + (tEnd - tStart));
                break;
            }
        }
        if (i >= this.tests.length) {
            success('[Success]: ' + this.name);
        } else {
            error('[Failed]: ' + this.name);
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