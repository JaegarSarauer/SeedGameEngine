import Manager from './Manager';

/**
 * Singleton manager that manages all Updateable Objects. All updateable objects are given a global game
 * ID (number) which can be used to distinguish it.
 * 
 * Any object that descends from Updateable will have an ID.
 */
export class _UpdateableManager extends Manager {
    /**
     * Constructor for UpdateableManager. Holds the static ID counter.
     */
    constructor() {
        super();
        this.updateableIDCounter = 0;
    }

    /**
     * Gives an ID and a way to unsubscribe from the Updateable binding with the manager.
     * 
     * Since the UpdateableManager does nothing to bind the Updateable to the manager, there is no code in the callback
     * assigned. However, the pattern is there to outline a default.
     * 
     * @param {Updateable} updateable The updateable to be registered.
     */
    registerUpdateable(updateable) {
        updateable.id = this.updateableIDCounter++;
        let deregisterCallback = () => {}
        return deregisterCallback;
    }
}

/**
 * Singleton reference to the Object Manager.
 */
const UpdateableManager = new _UpdateableManager();
export default UpdateableManager;