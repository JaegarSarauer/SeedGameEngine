import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';

/**
 * Renderable2DMultitex is a renderable component, similar to the Renderable2D, except
 * it supports multiple textures. The program assigned to this renderable computes what to
 * do with the shaders passed.
 */
export default class Renderable2DMultitex extends Renderable {
    constructor(program = ProgramManager.getProgram('Default')) {
        super(program);
        this.className = 'Renderable2DMultitex';
    }

    /**
     * Adds a texture to this renderable.
     * 
     * @param {textureJSONObject} textureObject Texture reference object, from TextureManager.
     */
    addTexture(textureObject) {
        this.textures.push(textureObject);
    }

    /**
     * Removes the nth texture from this component. Textures are pushed to end of list when added.
     * 
     * @param {number} textureIndex Index of texture to remove.
     */
    removeTexture(textureIndex) {
        if (textureIndex < 0 || textureIndex >= this.textures.length)
            return;

        this.textures.splice(textureIndex, 1);
    }

    /**
     * Removes all textures from this renderable.
     */
    removeTextures() {
        this.textures = [];
    }
}