import SceneManager from '../manager/SceneManager';
import DOMManager from '../manager/DOMManager';
import Updateable from '../base/Updateable';
import Bounds from '../internal/Bounds';

export default class Viewport extends Updateable {
    constructor(x, y, w, h) {
        super();
        this.bounds = new Bounds(x, y, w, h);

        /**
         * An object of keys represented by 'z' indexes to store all 
         * renderable objects in render order.
         */
        this.renderables = {};
    }

    registerRenderableComponent(renderable) {
        this.renderables[renderable.id] = renderable;
        let deregisterCallback = () => {
            delete this.renderables[renderable.id];
        }
        return deregisterCallback;
    }
}