/**
 * Helper class for waiting for async code to complete, before continuing with code.
 * Allows multiple async loading of different types (prmoises/async-await functions) to be organized 
 * into one "Loader".
 */
export default class Loader {
    /**
     * Loader constructor. Requires a callback function; called when all loading elements are complete.
     * 
     * @param {function} loadCompleteCallback Callback function once loading is complete.
     */
    constructor(loadCompleteCallback) {
        this.objectsToLoad = 0;
        this.loadCount = 0;
        this.loadCountQueued = 0;
        this.started = false;

        this.loadCompleteCallback = loadCompleteCallback;
    }

    /**
     * Adds a Promise to the loader. Adding a promise wraps it allow the Loader to determine when loading is done.
     * The load complete callback is not triggered until start() is called.
     * 
     * @param {Promise} promise A pending promise.
     */
    load(promise) {
        this.objectsToLoad++;
        promise.then(() => {
            if (this.started)
                this.loadCount++;
            else
                this.loadCountQueued++;

            if (this.loadCount >= this.objectsToLoad)
                this.loadCompleteCallback();
        });
    }

    /**
     * Notifies the loader that you allow the loadCompleteCallback to be triggered once
     * all items are loaded. Items will be loading before start is called, the results are just queued
     * until start is called.
     */
    start() {
        if (this.started)
            return;

        this.started = true;
        this.loadCount += this.loadCountQueued;
        this.loadCountQueued = 0;

        if (this.loadCount >= this.objectsToLoad)
            this.loadCompleteCallback();
    }
}