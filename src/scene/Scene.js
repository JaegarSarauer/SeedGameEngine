import Updateable from '../base/Updateable';

export default class Scene extends Updateable {

    constructor() {
        this.sceneObjects = {};
        this.viewports = {};
    }

    registerSceneObject(sceneObject) {
        this.sceneObjects[sceneObject.id] = sceneObject;
        let deregisterCallback = () => {
            delete this.sceneObjects[sceneObject.id];
        }
        return deregisterCallback;
    }

    registerRenderableComponent(renderable, viewport) {
        if (this.viewports[viewport.id] != null)
            return this.viewports[viewport.id].registerRenderableComponent(renderable);
        else {
            throw "This viewport doesn't exist on this scene!";
        }
    }

    registerViewport(viewport) {
        this.viewports[viewport.id] = viewport;
        let deregisterCallback = () => {
            delete this.sceneObjects[sceneObject.id];
        }
        return deregisterCallback;
    }

}