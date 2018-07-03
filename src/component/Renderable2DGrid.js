import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';

/**
 * Renderable2D is a renderable component which focusses on
 * 2D shaders and matricies for 2D space rendering.
 */
export default class Renderable2DGrid extends Renderable {
    constructor() {
        super();
        this.className = 'Renderable2DGrid';
    }

    setUniformData(positionMatrix) {
        this.program.setUniforms({
            'u_color': this.color.color,
            'u_matrix': positionMatrix,
            'u_depth': this.depth,
            'u_texture': this.textureID,
            'u_subTexcoord': this._subSpriteData,
        });
    }
}