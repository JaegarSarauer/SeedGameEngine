export class _TestManager {
    constructor() {
        this.tests = [];
    }

    addTest(test) {
        this.tests.push(test);
    }

    run() {
        for (let i = 0; i < this.tests.length; i++) {
            this.tests[i].run();
        }
    }
}

const TestManager = new _TestManager();
export default TestManager;