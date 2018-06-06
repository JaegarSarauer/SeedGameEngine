const logError = (data) => {
    console.info('\x1b[31m', data, '\x1b[0m');
}

const logSuccess = (data) => {
    console.info('\x1b[32m', data, '\x1b[0m');
}

/**
 * @test Example test.
 */
logSuccess("You ran tests success!");
logError("You ran tests fail!");
