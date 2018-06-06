/**
 * Baseclass for objects that follow the same pattern of the engine.
 * 
 * Used in anything that should follow a create, update, end loop 
 * handled by the Engine.
 */
export default class Updateable {

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