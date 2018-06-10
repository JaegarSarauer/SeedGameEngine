import Updateable from '../base/Updateable';

export default class Scene extends Updateable {

    constructor() {
        super();
        this.sceneObjects = [];
        this.viewports = [];
    }

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

    registerRenderableComponent(renderable, viewportIndex) {
        if (this.viewports.length > viewportIndex)
            return this.viewports[viewportIndex].registerRenderableComponent(renderable);
        else {
            throw "This viewport doesn't exist on this scene!";
        }
    }

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