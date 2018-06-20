export default class Loader {
    constructor(loadCompleteCallback) {
        this.objectsToLoad = 0;
        this.loadCount = 0;

        this.loadCompleteCallback = loadCompleteCallback;
    }

    load(promise) {
        this.objectsToLoad++;
        promise.then(() => {
            this.loadCount++;
            if (this.loadCount >= this.objectsToLoad)
                this.loadCompleteCallback();
        });
    }
}