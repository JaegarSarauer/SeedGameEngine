import SceneManager from '../manager/SceneManager';
import DOMManager from '../manager/DOMManager';
import Updateable from '../base/Updateable';
import Bounds from '../internal/Bounds';

/**
 * A viewport is a display port on the game canvas. Each scene can have multiple
 * viewports and renderable objects are assigned to the ones they want to be drawn on.
 * 
 * Viewports contain lighting and cameras.
 * 
 * GameObjects and their components exist across all viewports, it is up to the programmer
 * to specify the viewports to render to.
 * 
 * Examples on when to use viewports: 
 * - UI
 * - Minimaps
 * - Different views
 * 
 * TODO: An object of keys represented by 'z' indexes to store all 
 * renderable objects in render order.
 */
export default class Viewport extends Updateable {
    constructor(x, y, w, h) {
        super();
        this.bounds = new Bounds(x, DOMManager.canvasHeight - y - h, w, h);

        this.renderables = {};
    }

    /**
     * Register an Updateable component with this viewport for drawing.
     * 
     * @param {Renderable} renderable Renderable component to register.
     */
    registerRenderableComponent(renderable) {
        this.renderables[renderable.id] = renderable;
        let deregisterCallback = () => {
            delete this.renderables[renderable.id];
        }
        return deregisterCallback;
    }
}