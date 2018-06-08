import Manager from './Manager';

export default class PersistentManager extends Manager {
    constructor() {
        super(this, "PersistentManager");
        this.persistentObjects = {};
    }

    registerPersistentObject(persistentObject) {
        this.persistentObjects[persistentObject.id] = persistentObject;
        let deregisterCallback = () => {
            delete this.persistentObjects[persistentObject.id];
        }
        return deregisterCallback;
    }

    start() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].start();
        }
    }

    update() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].update();
        }
    }

    end() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].end();
        }
    }

    pause() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].pause();
        }
    }

    unpause() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].unpause();
        }
    }
}