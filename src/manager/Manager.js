/**
 * Baseclass for all Managers.
 * 
 * In order for a new Manager to be added to the engine, it must inherit
 * this class and define these functions to be recognized by the Engine.
 * 
 * TODO: Finish Plugins in Engine Manager & implement optional function calls on updateables.
 */

export default class Manager {
    constructor() {

    }
    
    start() {}
    update() {}
    end() {}
    pause() {}
    unpause() {}
}