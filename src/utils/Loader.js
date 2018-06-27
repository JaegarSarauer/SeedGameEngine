export default class Loader {
    constructor(loadCompleteCallback) {
        this.objectsToLoad = 0;
        this.loadCount = 0;
        this.loadCountQueued = 0;
        this.started = false;

        this.loadCompleteCallback = loadCompleteCallback;
    }

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