import Manager from './Manager';
import GameObject from '../object/GameObject';

export class _SceneManager extends Manager {
    constructor() {
        super();
        this.scenes = [];
    }

    /**
     * Adds a SceneObject to the current scene to be managed by it.
     * 
     * @param {SceneObject} sceneObject The SceneO∂bject that is being registered.
     */
    registerSceneObject(sceneObject) {
        let scene = this.getCurrentScene();
        if (scene != null)
            return scene.registerSceneObject(sceneObject);
    }

    registerViewport(viewport) {
        let scene = this.getCurrentScene();
        if (scene != null)
            scene.registerViewport(viewport);
    }

    getCurrentScene() {
        if (this.scenes.length > 0)
            return this.scenes[this.scenes.length - 1];
        return null;
    }

    start() {
        if (this.scenes.length > 0) {
            this.scenes[this.scenes.length - 1].start();
        }
    }

    update() {
        let scene = this.getCurrentScene();
        if (scene != null) {
            scene.update();
            for (let i = 0; i < scene.sceneObjects.length; i++) {
                scene.sceneObjects[i].update();
            }
        }
    }

    end() {
        if (this.scenes.length > 0)
            for (let i = this.scenes.length - 1; i > 0; i--) {
                this.scenes[i].end();
            }
    }

    pause() {
        if (this.scenes.length > 0)
            this.scenes[this.scenes.length - 1].pause();
    }

    unpause() {
        if (this.scenes.length > 0)
            this.scenes[this.scenes.length - 1].unpause();
    }

    addScene(scene) {
        this.pause();
        this.scenes.push(scene);
    }

    removeScene() {
        let current = this.scenes.pop();
        current.end();
        this.unpause();
    }
}

const SceneManager = new _SceneManager();
export default SceneManager;