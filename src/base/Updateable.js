import UpdateableManager from '../manager/UpdateableManager';

/**
 * Baseclass for objects that follow the same ECS pattern of the seed engine.
 * 
 * Used in anything that should follow a create, update, end loop 
 * handled by the Engine.
 * 
 * Many things will need to update/start/end. If you derive something that
 * has the start()/update()/end()... functions, the children should fill in
 * their respective callbacks (onStart()/onUpdate()/onEnd()/...).
 */
export default class Updateable {
    constructor() {
        this.hasStarted = false;
        this.hasPaused = false;
        this.id = -1;
        this.deregister = UpdateableManager.registerUpdateable(this);
    }

    /**
     * Base call function for when this Updateable is to be started.
     */
    start() {
        this.onStart();
        this.hasStarted = true;
        this.update = this.postStartUpdate;
    }

    /**
     * Base call function for when this Updateable is to be updated.
     * 
     * Is overwritten on successful start to a simpler update loop.
     */
    update() {
        if (this.hasPaused)
            return;
            
        this.start();
    }

    postStartUpdate() {
        if (this.hasPaused)
            return;

        this.onUpdate();
    }

    /**
     * Base call function for when this Updateable is to be ended.
     */
    end() {
        this.onEnd();
        this.destructor();
    }

    /**
     * Base call function for when this Updateable is to be paused.
     */
    pause() {
        if (!this.hasPaused) {
            this.onPause();
            this.hasPaused = true;
        }
    }

    /**
     * Base call function for when this Updateable is to be unpaused.
     */
    unpause() {
        if (this.hasPaused) {
            this.onUnpause();
            this.hasPaused = false;
        }
    }

    /**
     * Cleanup code for when destroying an Updateable.
     */
    destructor() {
        this.deregister();
    }

    /**
     * Called when the the object is first introduced.
     * 
     * Managing code will call this on first iteration once introduced to the game loop.
     */
    onStart() {}

    /**
     * Called on every update within the game, once the object has had onStart called.
     */
    onUpdate() {}

    /**
     * Called when the object is being removed or cleaned up from usage.
     */
    onEnd() {}

    /**
     * Called when the object is intended to be paused.
     */
    onPause() {}

    /**
     * Called when the object is to be unpaused from paused state.
     */
    onUnpause() {}
}