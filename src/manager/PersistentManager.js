import Manager from './Manager';

/**
 * Manages all Persistent Objects in the Engine. A PersistentObject is a child of 
 * GameObject, and sibling of SceneObjects.
 * 
 * PersistentObjects exist and update in all scenes, changing scenes will not inturrupt this object.
 */
export class _PersistentManager extends Manager {
    constructor() {
        super();
        this.persistentObjects = {};
    }

    /**
     * When a PersistentObject is created, it is assigned to the PersistentManager through this function.
     * The manager will keep reference to the Object and handle Engine events.
     * 
     * @param {persistentObject} persistentObject A PersistentObject.
     */
    registerPersistentObject(persistentObject) {
        this.persistentObjects[persistentObject.id] = persistentObject;
        let deregisterCallback = () => {
            delete this.persistentObjects[persistentObject.id];
        }
        return deregisterCallback;
    }

    /**
     * Calls update on all Persistent Objects.
     */
    update() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].update();
        }
    }

    /**
     * Calls end on all Persistent Objects.
     */
    end() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].end();
        }
    }

    /**
     * Calls pause on all Persistent Objects.
     */
    pause() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].pause();
        }
    }

    /**
     * Calls unpause on all Persistent Objects.
     */
    unpause() {
        let objKeys = Object.keys(this.persistentObjects);
        for (let i = 0; i < objKeys.length; i++) {
            this.persistentObjects[objKeys[i]].unpause();
        }
    }
}

/**
 * Singleton reference to the Persistent Objects Manager.
 */
const PersistentManager = new _PersistentManager();
export default PersistentManager;