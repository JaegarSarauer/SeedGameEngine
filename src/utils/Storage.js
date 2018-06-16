const DIRECTORY = {
    __d: null,
    __w: [],
    val: 'function',
};

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
        this.store = this._createDir();
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
            return (curLoc == null) ? curLoc : curLoc[key];
        }, this.store);
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
            if (curLoc[key] == null) {
                curLoc[key] = this._createDir();
            }
            if (key === loc[loc.length - 1]) {
                curLoc[key].__d = data;
            }
            return curLoc[key];
        }, this.store);
        this.notify(location);
        return true;
    }

        //notify all descnedants.
    notify(location) {
        let loc = this._parseLocation(location);
        loc.reduce((curLoc, key) => {
            this._notifyWatchers(curLoc.__w, curLoc);
            return curLoc[key];
        }, this.store);
    }

    _createDir() {
        let newDir = Object.assign({}, DIRECTORY);
        newDir.val = () => {return newDir.__d;};
        return newDir;
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
     * when it is changed. When you watchNow, it will only notify on new changes.
     * It will not trigger the callback.
     * 
     * Returns a callback to stop watching.
     */
    watchNow(location, callback) {
        let id = this.listenerIDCount++;

        let loc = this._parseLocation(location);
        loc.reduce((curLoc, key) => {
            console.info(curLoc, key)
            if (curLoc[key] == null) {
                curLoc[key] = this._createDir();
            }
            if (key === loc[loc.length - 1]) {
                curLoc[key].__w.push({id, callback});
            }
            return curLoc[key];
        }, this.store);

        return () => {
            this.close(location, id);
        }
    }

    /**
     * Watches a location in storage and notifies the callback of new data
     * when it is changed. When you watch, you see it at first, and all changes.
     * 
     * Returns a callback to stop watching.
     */
    watch(location, callback) {
        let id = this.listenerIDCount++;

        let loc = this._parseLocation(location);
        loc.reduce((curLoc, key) => {
            if (curLoc[key] == null) {
                curLoc[key] = this._createDir();
            }
            if (key === loc[loc.length - 1]) {
                curLoc[key].__w.push({id, callback});
                callback(curLoc[key]);
            }
            return curLoc[key];
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
            return (curLoc == null) ? curLoc : curLoc[key];
        }, this.store);
        if (watchers.__w == null)
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