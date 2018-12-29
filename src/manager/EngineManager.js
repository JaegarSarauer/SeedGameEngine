import Manager from './Manager';
import RenderManager from './RenderManager';
import ProgramManager from './ProgramManager';
import SceneManager from './SceneManager';
import DOMManager from './DOMManager';
import PersistentManager from './PersistentManager';
import InputManager from './InputManager';
import AudioManager from './AudioManager';

/**
 *  A singleton & Manager.
 * 
 * This class manages the core ECS system & game loop. It calls all other Managers
 * required to start. 
 * 
 * TODO: This system will be rewritten to allow Manager plugins to be added by the 
 * user without editing the Engine.
 */
export class _EngineManager extends Manager {
    constructor() {
        super();
        this.MS_PER_FRAME = 20;
        this.coreUpdateLoopHandle = null;
        this.hasPaused = false;
    }

    /**
     * Called when the Engine should start all systems.
     * This also includes specific setup code to get the game running, 
     * including setting up the render loop.
     */
    start() {
        //Needs to be first to target the canvas.
        DOMManager.start();
        PersistentManager.start();
        SceneManager.start();

        //Needs to be ahead of RenderManager to init Programs for WebGL.
        ProgramManager.start();
        RenderManager.start();
        RenderManager.update();
        InputManager.start();
        //AudioManager.start(); Must be started manually https://goo.gl/7K7WLu

        this.coreUpdateLoopHandle = setInterval(() => {
            if (!this.hasPaused) {
                this.update();
            }
        }, this.MS_PER_FRAME);
    }

    /**
     * The EngineManager sets up a loop on start() to call this function.
     * Recalling this function will force a game update.
     */
    update() {
        PersistentManager.update();
        SceneManager.update();
        //RenderManager.update(); Only called when a Renderable is updated.
        InputManager.update();
    }

    /**
     * Ends the Engine by calling all manager end functions.
     */
    end() {
        PersistentManager.end();
        SceneManager.end();
        RenderManager.end();
        clearInterval(this.coreUpdateLoopHandle);
        DOMManager.end();
        AudioManager.end();
    }

    /**
     * Pauses the Engine by calling all manager pause functions.
     */
    pause() {
        RenderManager.pause();
        PersistentManager.pause();
        SceneManager.pause();
        this.hasPaused = true;
    }

    /**
     * Unpauses the Engine by calling all manager unpause functions.
     */
    unpause() {
        SceneManager.unpause();
        PersistentManager.unpause();
        RenderManager.unpause();
        this.hasPaused = false;
    }
}

/**
 * Singleton reference to the Engine Manager.
 */
const EngineManager = new _EngineManager();
export default EngineManager;