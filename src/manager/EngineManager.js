import Manager from './Manager';
import RenderManager from './RenderManager';
import SceneManager from './SceneManager';
import PersistentManager from './PersistentManager';

/**
 * Manager of the core ECS system & game loop.
 */
export default class EngineManager extends Manager {
    constructor() {
        super(this, "EngineManager");
        this.MS_PER_FRAME = 30;
        this.coreUpdateLoopHandle = null;
        this.hasPaused = true;
    }

    start() {
        this.coreUpdateLoopHandle = setInterval(() => {
            if (!this.hasPaused) {
                this.update();
            }
        }, this.MS_PER_FRAME);
        PersistentManager.start();
        SceneManager.start();
        RenderManager.start();
    }

    _update() {
        PersistentManager.update();
        SceneManager.update();
        RendererManager.update();
    }

    end() {
        PersistentManager.end();
        SceneManager.end();
        RendererManager.end();
        clearInterval(this.coreUpdateLoopHandle);
    }

    pause() {
        RendererManager.pause();
        PersistentManager.pause();
        SceneManager.pause();
        this.hasPaused = true;
    }

    unpause() {
        SceneManager.unpause();
        PersistentManager.unpause();
        RendererManager.unpause();
        this.hasPaused = false;
    }
}