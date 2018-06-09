import Manager from './Manager';
//import RenderManager from './RenderManager';
import SceneManager from './SceneManager';
import PersistentManager from './PersistentManager';

/**
 * Manager of the core ECS system & game loop.
 */
export class _EngineManager extends Manager {
    constructor() {
        super();
        this.MS_PER_FRAME = 30;
        this.coreUpdateLoopHandle = null;
        this.hasPaused = false;
    }

    start() {
        this.coreUpdateLoopHandle = setInterval(() => {
            if (!this.hasPaused) {
                this._update();
            }
        }, this.MS_PER_FRAME);
        PersistentManager.start();
        SceneManager.start();
        //RenderManager.start();
    }

    _update() {
        PersistentManager.update();
        SceneManager.update();
        //RenderManager.update();
    }

    end() {
        PersistentManager.end();
        SceneManager.end();
        //RenderManager.end();
        clearInterval(this.coreUpdateLoopHandle);
    }

    pause() {
        //RenderManager.pause();
        PersistentManager.pause();
        SceneManager.pause();
        this.hasPaused = true;
    }

    unpause() {
        SceneManager.unpause();
        PersistentManager.unpause();
        //RenderManager.unpause();
        this.hasPaused = false;
    }
}

const EngineManager = new _EngineManager();
export default EngineManager;