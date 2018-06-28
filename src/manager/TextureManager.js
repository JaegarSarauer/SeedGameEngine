import Manager from './Manager';
import DOMManager from './DOMManager';


/**
 * Manages textures in the engine so the RendererManager and Renderables
 * can reference one location for Textures. Essentially a texture library.
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
     * @param {number} texID Name of the texture.
     * 
     * @returns {Texture Object} Returns a JSON object with Texture data.
     */
    getTexture(texID) {
        if (this.textures[texID] == null)
            throw 'Texture does not exist!';
        return this.textures[texID];
    }



    /**
     * Creates a Texture JSON Object and initializes the Texture with WebGL.
     * The Texture is added to the textures array.
     * 
     * @param {string} programName Name of the texture.
     * @param {string} vertexShaderSource Source code of the vertex shader.
     * @param {string} fragmentShaderSource Source code of the fragment shader.
     *
     * 
     * @param {string} texName Name of the texture.
     * @param {string} textureImageAsset Path to the texture image to load.
     * @param {number} frameWidth Width of sprite in spritesheet. -1 for full.
     * @param {number} frameHeight Height of sprite in spritesheet. -1 for full.
     * 
     * @returns {Promise} A pending promise which will return the texture reference after complete.
     */
    addTexture(texName, textureImageAsset, frameWidth, frameHeight) {
        return this._createTextureFromAsset(textureImageAsset).then((textureData) => {
            this.textures[texName] = Object.assign({
                name: texName,
                id: this.textureIDCounter++,
                frameWidth,
                frameHeight,
            }, textureData);
            return this.textures[texName];
        })
    }

    /**
     * Private function used for initializing a Texture from a path and
     * binding it with WebGL.
     * 
     * @param {string} asset Path to texture file.
     * 
     * @returns {Promise} Returns a pending promise.
     */
    _createTextureFromAsset(asset) {
        let texInfo = {
            tex: DOMManager.GL.createTexture(),
            width: 0,
            height: 0,
        };
        DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, texInfo.tex);
       
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_S, DOMManager.GL.CLAMP_TO_EDGE);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_T, DOMManager.GL.CLAMP_TO_EDGE);

        return new Promise((res, rej) => {
            let assetLoaded = new Image();
            assetLoaded.addEventListener('load', () => {
                texInfo.width = assetLoaded.width;
                texInfo.height = assetLoaded.height;
        
                DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, texInfo.tex);
                DOMManager.GL.texImage2D(DOMManager.GL.TEXTURE_2D, 0, DOMManager.GL.RGBA, DOMManager.GL.RGBA, DOMManager.GL.UNSIGNED_BYTE, assetLoaded);
                DOMManager.GL.generateMipmap(DOMManager.GL.TEXTURE_2D);
                return res(texInfo);
            });
            assetLoaded.src = asset;
        })
    }
}

/**
 * Singleton reference to the WebGL Program Manager.
 */
const TextureManager = new _TextureManager();
export default TextureManager;