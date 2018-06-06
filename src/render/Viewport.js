import SceneManager from '../manager/SceneManager';

export default class Viewport extends Updateable {
    constructor() {
        this.deregister = SceneManager.registerViewport(this);
    }
}