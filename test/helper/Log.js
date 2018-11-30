export const error = (data) => {
    console.info('%c' + data, 'color: red;');
}

export const success = (data) => {
    console.info('%c' + data, 'color: green;');
}

export const info = (data) => {
    console.info(data);
}