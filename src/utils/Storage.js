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
            _d: {},
            _w: [],
        };
    }

    /**
     * Parses a storage location into an array of paths.
     * 
     * @param {string} location Location to parse.
     */
    _parseLocation(location) {
        return location.split('/');
    }

    /**
     * Returns data from a location
     * 
     * @param {string} location A location. Example: Users/User1/firstName.
     */
    get(location) {
        let loc = this._parseLocation(location);
        return loc.reduce((curLoc, key) => {
            return (curLoc == null) ? curLoc : curLoc._d[key];
        }, this.store)._d;
    }

    /**
     * Sets data at a location, 
     * 
     * @param {string} location A location. Example: Users/User1/firstName.
     * @param {*} data Data to set to the location.
     */
    set(location, data) {
        let loc = this._parseLocation(location);
        loc.reduce((curLoc, key) => {
            if (curLoc._d[key] == null) {
                curLoc._d[key] = {
                    _d: {},
                    _w: []
                };
            }
            if (key === loc[loc.length - 1]) {
                curLoc._d[key]._d = data;
            }
            return curLoc._d[key];
        }, this.store);
        this.notify();
        return true;
    }

        //notify all descnedants.
    notify() {
        let loc = this._parseLocation(location);
        loc.reduce((curLoc, key) => {
            this._notifyWatchers(curLoc._w, curLoc._d);
            if (key === loc[loc.length - 1]) {
                this._notifyWatchers(curLoc._d[key]._w, curLoc._d[key]._d);
            }
            return curLoc._d[key];
        }, this.store);
    }

    /**
     * Notifies of a data change location.
     */
    _notifyWatchers(watchers, data) {
        for (let i = 0; i < watchers.length; i++) {
            watchers[i].callback(data);
        }
    }

    /**
     * Watches a location in storage and notifies the callback of new data
     * when it is changed.
     * 
     * Returns a callback to stop watching.
     */
    watch(location, callback) {
        let id = this.listenerIDCount++;

        let loc = this._parseLocation(location);
        loc.reduce((curLoc, key) => {
            if (curLoc._d[key] == null) {
                curLoc._d[key] = {
                    _d: {},
                    _w: []
                };
            }
            if (key === loc[loc.length - 1]) {
                curLoc._d[key]._w.push({id, callback});
                callback(curLoc._d[key]._d);
            }
            return curLoc._d[key];
        }, this.store);

        return () => {
            this.close(location, id);
        }
    }

    /**
     * Stops a watcher from watching at this location. It must be
     * the same location as the original watch call.
     * 
     * @param {string} location Location of the listener to close.
     * @param {number} id ID of the listener to remove.
     */
    close(location, id) {
        let loc = this._parseLocation(location);
        let watchers = loc.reduce((curLoc, key) => {
            return (curLoc == null) ? curLoc : curLoc._d[key];
        }, this.store);
        if (watchers._w == null)
            return;
        for (let i = 0; i < watchers.length; i++) {
            if (watchers[i].id == id) {
                watchers.splice(i, 1);
                return;
            }
        }
    }
}

const Storage = new _Storage();
export default Storage;