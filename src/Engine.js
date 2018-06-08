'use-strict';

import EngineManager from './manager/EngineManager';
import SceneManager from './manager/SceneManager';
import DOMManager from './manager/DOMManager';
import Manager from './manager/Manager';

/**
 * Engine Singleton class. Entry point reference to access managers and
 * to start and stop the Engine.
 */
export default class Engine extends Manager {
    /**
     * Engine Contstructor.
     */
    constructor() {
        super(this, "Engine");
        this.i = this;
        this.SceneManager = this.SceneManager;
    }

    /**
     * Starts the engine.
     */
    start() {
        DOMManager.start();
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