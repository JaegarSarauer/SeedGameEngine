/**
 * 
 */
export default class Messager {
    constructor() {
        this.listenerIDCounter = 0;
        this.data = {};
        this.listeners = {};
    }

    set(key, data) {
        this.data[key] = data;
        if (this.listeners[key] == null) {
            this.listeners[key] = [];
        } else {
            this.notify(key);
        }
    }

    /*
    triggers the events but doesnt set data.
    */
    notify(key) {
        for (let i = 0; i < this.listeners[key].length; i++) {
            this.listeners[key][i].callback(this.data[key]);
        }
    }

    get(key) {
        return this.data[key];
    }

    watch(key, callback, notifyNow = true) {
        let token = {
            id: this.listenerIDCounter++,
            callback,
            stop: () => {
                for (let i = 0; i < this.listeners[key].length; i++) {
                    if (this.listeners[key][i].id === token.id) {
                        delete this.listeners[key][token.id];
                    }
                }
            }
        }
        if (this.listeners[key] == null) {
            this.listeners[key] = [];
            notifyNow = false;
        }
        this.listeners[key].push(token);
        if (notifyNow)
            callback(this.data[key]);
        return token;
    }
}