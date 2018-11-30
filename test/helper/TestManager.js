export class _TestManager {
    constructor() {
        this.tests = [];
    }

    addTest(test) {
        this.tests.push(test);
    }

    testComplete(testID) {
        return this.runTest(++testID);
    }

    runTest(testID) {
        return new Promise((res, rej) => {
            if (testID >= this.tests.length) {
                res('Tests complete.');
            }
            let test = this.tests[testID];
            test.run();
            let int = setInterval(() => {
                if (test.testComplete) {
                    clearInterval(int);
                    res(testID);
                }
            }, 10);
        }).then((resID) => {
            if (typeof resID == "number")
                this.testComplete(resID);
            else 
                console.info(resID);
        });
    }

    run() {
        let testIndex = 0;
        this.runTest(testIndex).catch((e) => {
            console.info(e);
        });
    }
}

const TestManager = new _TestManager();
export default TestManager;