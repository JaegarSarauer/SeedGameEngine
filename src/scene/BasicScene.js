import Scene from './Scene';
import { Viewport } from '../entry';
import DOMManager from '../manager/DOMManager';

/**
 * A basic representation of a working scene. Scenes need a viewport to give Renderable
 * components a place to be viewed by the RenderManager.
 * 
 * This scene only contains one viewport which takes up the size of the canvas element.
 */
export default class BasicScene extends Scene {
    constructor() {
        super();
        this.registerViewport(new Viewport(0, 0, DOMManager.canvas.width, DOMManager.canvas.height));
    }
}