import Updateable from '../base/Updateable';

export default class Scene extends Updateable {

    constructor() {
        this.sceneObjects = {};
    }

    registerSceneObject(sceneObject) {
        this.sceneObject[sceneObject.id] = sceneObject;
        let deregisterCallback = () => {
            delete this.sceneObject[sceneObject.id];
        }
        return deregisterCallback;
    }

}