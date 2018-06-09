import ObjectManager from '../manager/ObjectManager';

/**
 * Baseclass for objects that follow the same pattern of the engine.
 * 
 * Used in anything that should follow a create, update, end loop 
 * handled by the Engine.
 * 
 * Many things will need to update/start/end. If you derive something that
 * has the start()/update()/end()... functions, the children should fill in
 * their respective callbacks (onStart()/onUpdate()/onEnd()).
 */
export default class Updateable {
    constructor() {
        this.hasStarted = false;
        this.hasPaused = false;
        this.id = -1;
        this.deregister = ObjectManager.registerUpdateable(this);
    }

    start() {
        if (!this.hasStarted) {
            this.onStart();
            this.hasStarted = true;
        }
    }

    update() {
        if (this.hasPaused)
            return;
            
        if (this.hasStarted) {
            this.onUpdate();
        } else {
            this.start();
        }
    }

    end() {
        this.onEnd();
        this.destructor();
    }

    pause() {
        if (!this.hasPaused) {
            this.onPause();
            this.hasPaused = true;
        }
    }

    unpause() {
        if (this.hasPaused) {
            this.onUnpause();
            this.hasPaused = false;
        }
    }

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