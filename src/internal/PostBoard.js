export default class PostBoard {
    constructor() {
        this.posts = {};
        this.watchers = {};
        this.watcherID = 0;
    }

    look(key) {
        return this.posts[key];
    }

    post(key, message) {
        this.posts[key] = message;
        let watcherKeys = Object.keys(this.watchers[key]);
        for (let i = 0; i < this.watcherKeys.length; i++) {
            this.watchers[key][watcherKeys[i]](message);
        }
    }

    watch(key, callback, id = null) {
        if (id == null)
            id = this.watcherID++;
        this.watchers[key][id] = callback;
        return id;
    }

    close(key, id) {
        delete this.watchers[key][id];
    }

    closeAll(id) {
        let keyKeys = Object.keys(this.watchers);
        for (let i = 0; i < this.keyKeys.length; i++) {
            delete this.watchers[keyKeys[i]][id];
        }
    }
}