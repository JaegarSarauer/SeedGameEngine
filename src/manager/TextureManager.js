import Manager from './Manager';
import DOMManager from './DOMManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';

/**
 * Manages WebGL Programs so that they only need to be created once across the engine
 * allowing multiple objects to still share the same reference.
 * 
 * Elliminates the need for the programmer to compile shaders and create programs, and eases 
 * on-the-fly Shader compiling.
 */
export class _TextureManager extends Manager {
    constructor() {
        super();
        this.textureIDCounter = 0;
        this.textures = {};
    }

    /**
     * Returns a texture JSON Object containing the texture, texture data, name and id.
     * 
     * @param {number} texID Name of the program.
     * 
     * @returns {Texture Object} Returns a JSON object with Texture data.
     */
    getTexture(texID) {
        if (this.textures[texID] == null)
            throw 'Texture does not exist!';
        return this.textures[texID];
    }

    /**
     * Creates a Program JSON Object and initializes the program and metadata.
     * The program is added to the programs array.
     * 
     * @param {string} programName Name of the program.
     * @param {string} vertexShaderSource Source code of the vertex shader.
     * @param {string} fragmentShaderSource Source code of the fragment shader.
     */
    addTexture(texName, textureImageAsset, frameWidth, frameHeight) {
        this.textures[texName] = Object.assign({
            name: texName,
            id: this.textureIDCounter++,
            frameWidth,
            frameHeight,
        }, this._createTextureFromAsset(textureImageAsset));
        return this.textures[texName];
    }

    _createTextureFromAsset(asset) {
        let texInfo = {
            tex: DOMManager.GL.createTexture(),
            width: 0,
            height: 0,
        };
        DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, texInfo.tex);
       
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_S, DOMManager.GL.CLAMP_TO_EDGE);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_T, DOMManager.GL.CLAMP_TO_EDGE);

        var assetLoaded = new Image();
        assetLoaded.addEventListener('load', function() {
            texInfo.width = assetLoaded.width;
            texInfo.height = assetLoaded.height;
    
            DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, texInfo.tex);
            DOMManager.GL.texImage2D(DOMManager.GL.TEXTURE_2D, 0, DOMManager.GL.RGBA, DOMManager.GL.RGBA, DOMManager.GL.UNSIGNED_BYTE, assetLoaded);
            DOMManager.GL.generateMipmap(DOMManager.GL.TEXTURE_2D);
        });
        assetLoaded.src = asset;
       
        return texInfo;
    }
}

/**
 * Singleton reference to the WebGL Program Manager.
 */
const TextureManager = new _TextureManager();
export default TextureManager;