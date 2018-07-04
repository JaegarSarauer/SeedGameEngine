import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';

/**
 * Renderable2D is a renderable component which focusses on
 * 2D shaders and matricies for 2D space rendering.
 */
export default class Renderable2DMultitex extends Renderable {
    constructor(program = ProgramManager.getProgram('Default')) {
        super(program);
        this.className = 'Renderable2DMultitex';
    }

    addTexture(textureObject) {
        this.textures.push(textureObject);
    }

    removeTexture(textureIndex) {
        if (textureIndex < 0 || textureIndex >= this.textures.length)
            return;

        this.textures.splice(textureIndex, 1);
    }

    removeTextures() {
        this.textures = [];
    }
}