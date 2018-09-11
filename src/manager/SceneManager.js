import Manager from './Manager';
import GameObject from '../object/GameObject';

/**
 * A manager which manages all scenes and passes commands to the current scene.
 * 
 * Manages scenes on a stack, pausing scenes below them (stopping rendering), and managing
 * the top scene for triggering updates on all objects on the scene.
 * 
 * GameObjects, components, or anything else can use the SceneManager to reference the
 * current active scene. There are also wrapper functions for passing SceneObjects and
 * Viewports to the current scene for registration with that scene.
 */
export class _SceneManager extends Manager {
    constructor() {
        super();
        this.scenes = [];
    }

    /**
     * Adds a SceneObject to the current scene on the stack. The scene will hold 
     * reference and manage the SceneObject.
     * 
     * @param {SceneObject} sceneObject The SceneObject that is being registered.
     */
    registerSceneObject(sceneObject) {
        let scene = this.getCurrentScene();
        if (scene != null)
            return scene.registerSceneObject(sceneObject);
    }

    /**
     * Addsa viewport to the current scene on the stack. The scene will hold reference
     * to the viewport.
     * 
     * @param {viewport} viewport The Viewport that is being registered.
     */
    registerViewport(viewport) {
        let scene = this.getCurrentScene();
        if (scene != null)
            scene.registerViewport(viewport);
    }

    /**
     * Gets the current scene on the stack. This scene will be the one currently
     * used in the update loop.
     */
    getCurrentScene() {
        if (this.scenes.length > 0)
            return this.scenes[this.scenes.length - 1];
        return null;
    }

    /**
     * Starts the current scene on the stack.
     */
    start() {
        if (this.scenes.length > 0) {
            this.scenes[this.scenes.length - 1].start();
        }
    }

    /**
     * Updates the current scene and all SceneObjects that are assigned to that
     * scene.
     */
    update() {
        let scene = this.getCurrentScene();
        if (scene != null) {
            scene.update();
            for (let i = 0; i < scene.sceneObjects.length; i++) {
                scene.sceneObjects[i].update();
            }
        }
    }

    /**
     * Ends all scenes, starting from the top & poping each scene off the stack as it goes.
     */
    end() {
        while (this.scenes.length > 0) {
            this.scenes[this.scenes.length - 1].pop().end();
        }
    }

    /**
     * Pauses the current scene.
     */
    pause() {
        if (this.scenes.length > 0)
            this.scenes[this.scenes.length - 1].pause();
    }
    
    /**
     * Unpauses the current scene.
     */
    unpause() {
        if (this.scenes.length > 0)
            this.scenes[this.scenes.length - 1].unpause();
    }

    /**
     * Adds the new scene to the top of the stack, pausing the current
     * scene first.
     * 
     * @param {Scene} scene The new scene.
     */
    addScene(scene) {
        if (this.scenes.length > 0) {
            this.scenes[this.scenes.length - 1].__proto__.__proto__.pause();
        }
        this.scenes.push(scene);
    }

    /**
     * Removes the top scene from the stack, calls its end() function,
     * and unpauses the scene below it.
     */
    removeScene() {
        this.scenes.pop().end();
        this.scenes[this.scenes.length - 1].__proto__.__proto__.unpause();
    }
}

/**
 * Singleton reference to the Scene Manager.
 */
const SceneManager = new _SceneManager();
export default SceneManager;