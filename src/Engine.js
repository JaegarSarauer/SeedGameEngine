'use-strict';

import EngineManager from './manager/EngineManager';

/**
 * Engine Singleton class. Entry point reference to access managers and
 * to start and stop the Engine.
 */
export class _Engine {
    /**
     * Engine Contstructor.
     */
    constructor() {
        
    }

    /**
     * Starts the engine.
     */
    start() {
        EngineManager.start();
    }

    /**
     * Stops the engine and cleans up code.
     */
    end() {
        EngineManager.end();
    }

    /**
     * Pauses the entire engine.
     */
    pause() {
        EngineManager.pause();
    }

    /**
     * Resumes to the Engine.
     */
    unpause() {
        EngineManager.unpause();
    }
}

/**
 * Engine Singleton reference.
 */
export default Engine = new _Engine();