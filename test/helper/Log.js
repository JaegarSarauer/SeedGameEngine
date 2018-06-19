export const error = (data) => {
    console.info('\x1b[31m', data, '\x1b[0m');
}

export const success = (data) => {
    console.info('\x1b[32m', data, '\x1b[0m');
}

export const info = (data) => {
    console.info('\x1b[0m', data);
}