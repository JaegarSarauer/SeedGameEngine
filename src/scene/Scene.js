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

    registerViewport(viewport) {
        this.viewports[viewport.id] = viewport;
        let deregisterCallback = () => {
            delete this.sceneObjects[sceneObject.id];
        }
        return deregisterCallback;
    }

}