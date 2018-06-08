'use-strict';

const TestManager = require('./helper/TestManager');
const ExampleTest = require('./tests/ExampleTest');

new ExampleTest();
TestManager.run();