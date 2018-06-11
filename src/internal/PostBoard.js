/**
 * Experemental! Still looking at other ways to implement this that would be more useful
 * for the engine, and lower lookup, post, and watch runtimes.
 * 
 * A "PostBoard" is a messaging system that anyone who has reference to may "post" updates to.
 * Posts are any type of data, assigned by key.
 * Other objects may look at "posts", and continuously watch a "post".
 */

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