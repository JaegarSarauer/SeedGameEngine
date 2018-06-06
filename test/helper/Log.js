module.exports.error = (data) => {
    console.info('\x1b[31m', data, '\x1b[0m');
}

module.exports.success = (data) => {
    console.info('\x1b[32m', data, '\x1b[0m');
}

module.exports.info = (data) => {
    console.info('\x1b[0m', data);
}