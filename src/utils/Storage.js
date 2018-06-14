/**
 * Storage is a path delimited messaging system for global use. Data may be
 * stored and retrieved from a path location, returning null on empty locations.
 * 
 * Locations can be "listened" to, which trigger activation when data is set, or
 * there is a call to "trigger" at that location.
 * 
 * 
 */
export class _Storage {
    constructor() {
        this.listenerIDCount = 0;
        this.store = {
            user: {
                name: {
                    first: 'bob',
                    last: 'johnson',
                }
            }
        };
    }

    /**
     * Parses a storage location into an array of paths.
     * 
     * @param {string} location Location to parse.
     */
    _parseLocation(location) {
        return location.split('');
    }

    /**
     * Returns data from a location
     * 
     * @param {string} location A location. Example: Users/User1/firstName.
     */
    get(location) {
        let loc = this._parseLocation(location);
        let data = loc.reduce((data, key) => {
            return (typeof data == "undefined" || data === null) ? data : data[key];
        }, this.store);
        console.info(data)
    }

    /**
     * Sets data at a location, 
     * 
     * @param {string} location A location. Example: Users/User1/firstName.
     * @param {*} data Data to set to the location.
     */
    set(location, data) {

    }

    /**
     * Notifies of a data change location.
     */
    notify(location) {

    }

    /**
     * Listens to a location in storage and notifies the callback of new data
     * when it is changed.
     * 
     * Returns a callback to stop listening.
     */
    listen(location, callback) {
        let id = this.listenerIDCount++;



        return () => {
            this.close(location, id);
        }
    }

    close() {

    }
}

const Storage = new _Storage();
export default Storage;