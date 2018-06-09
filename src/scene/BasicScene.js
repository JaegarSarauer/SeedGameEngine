import Scene from './Scene';
import { Viewport } from '../entry';
import DOMManager from '../manager/DOMManager';

export default class BasicScene extends Scene {
    constructor() {
        super();
        this.registerViewport(new Viewport(0, 0, DOMManager.canvas.width, DOMManager.canvas.height));
    }
}