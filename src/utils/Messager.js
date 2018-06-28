/**
 * A messager is a managed dictionary that notifies listeners when specific entries
 * in the dictionary are updated. The messager contains functions for setting, getting, listening
 * and notifying of data changes.
 */
export default class Messager {
    constructor() {
        this.listenerIDCounter = 0;
        this.data = {};
        this.listeners = {};
    }

    /**
     * Updates the data at a specific location in the Messager storage dictionary.
     * If there are listeners, notify them.
     * 
     * @param {string} key Dictionary key name.
     * @param {*} data Data to set.
     */
    set(key, data) {
        this.data[key] = data;
        if (this.listeners[key] == null) {
            this.listeners[key] = [];
        } else {
            this.notify(key);
        }
    }

    /**
     * Notifies all listeners currently waiting on updates at
     * the location of the dictionary key.
     * 
     * @param {string} key Dictionary key name.
     */
    notify(key) {
        for (let i = 0; i < this.listeners[key].length; i++) {
            this.listeners[key][i].callback(this.data[key]);
        }
    }

    /**
     * Returns the data at a location in the dictionary specified by the 
     * key.
     * 
     * @param {string} key Dictionary key name.
     */
    get(key) {
        return this.data[key];
    }

    /**
     * Listens to a position in the dictionary for updates. The callback passed to the function
     * is called whenever the position defined by the dictionary key is updated. 
     * 
     * By default, notifies the callback of the current data upon watching.
     * 
     * 
     * 
     * @param {string} key Dictionary key name.
     * @param {function} callback Callback function to trigger.
     * @param {boolean} notifyNow Default: true. Trigger the callback now.
     * 
     * @returns {function} A callback function to de-register from watching data at the key location.
     */
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