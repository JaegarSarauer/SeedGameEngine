import Updateable from '../base/Updateable';
import { SceneObject } from '../entry';

/**
 * Baseclass for all scenes. When creating a new scene, it should inherit this
 * class. 
 * Scenes keep track of their scene objects and viewports. The scene baseclass has
 * functions for registering these with the scene.
 */
export default class Scene extends Updateable {

    /**
     * Builds the SceneObjects and Viewports list.
     */
    constructor() {
        super();
        this.sceneObjects = [];
        this.viewports = [];
    }

    /**
     * When a SceneObject is created, it is routed through the SceneManager to the current
     * active scene to this function. The SceneObject will register with the scene to be referenced
     * on update/pause/destruct calls on a scene specific basis.
     * 
     * @param {SceneObject} sceneObject A SceneObject to register.
     */
    registerSceneObject(sceneObject) {
        this.sceneObjects.push(sceneObject);
        let deregisterCallback = () => {
            for (let i = 0; i < this.sceneObjects.length; i++) {
                if (this.sceneObjects[i].id ==sceneObject.id)
                    this.sceneObjects.splice(i, 1);
                    return;
            }
        }
        return deregisterCallback;
    }

    /**
     * Registers a Renderable component with the viewport, by index.
     * 
     * @param {Renderable} renderable A Renderable to register to the viewport.
     * @param {number} viewportIndex The index of the viewport.
     */
    registerRenderableComponent(renderable, viewportIndex) {
        if (this.viewports.length > viewportIndex)
            return this.viewports[viewportIndex].registerRenderableComponent(renderable);
        else {
            throw "This viewport doesn't exist on this scene!";
        }
    }

    /**
     * When a Viewport is created, it is routed through the SceneManager to the current
     * active scene to this function. The Viewport will register with the scene to be referenced
     * by the RenderManager and assigned to by Renderables.
     * 
     * @param {Viewport} viewport A Viewport to register.
     */
    registerViewport(viewport) {
        this.viewports.push(viewport);
        this.viewportIndex = this.viewports.length - 1;
        let deregisterCallback = () => {
            for (let i = 0; i < this.viewports.length; i++) {
                if (this.viewports[i].id === viewport.id) {
                    this.viewports[i].splice(i, 1);
                    return;
                }
            }
        }
        return deregisterCallback;
    }
}