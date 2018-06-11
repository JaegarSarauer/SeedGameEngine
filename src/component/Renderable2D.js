import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';

/**
 * Renderable2D is a renderable component which focusses on
 * 2D shaders and matricies for 2D space rendering.
 */
export default class Renderable2D extends Renderable {
    constructor() {
        super();
        this.className = 'Renderable2D';
    }
}