import Manager from './Manager';
import DOMManager from './DOMManager';
import AudioManager from './AudioManager';
const { createCanvas } = require('canvas')


/**
 * Manages textures in the engine so the RendererManager and Renderables
 * can reference one location for Textures. Essentially a texture library.
 */
export class _TextureManager extends Manager {
    constructor() {
        super();
        this.textures = {};
        this.textureIDs = [];
        this.textTextureIDCounter = 0;
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
            return null;
        return this.textures[texID];
    }

    _setAvailableTextureID() {
        for (let i = 0; i < this.textureIDs.length; i++)
            if (!this.textureIDs[i]) {
                this.textureIDs[i] = true;
                return i;
            }
        this.textureIDs.push(true);
        return this.textureIDs.length - 1;
    }

    /**
     * Creates a Texture JSON Object and initializes the Texture with WebGL.
     * The Texture is added to the textures array.
     * 
     * @param {string} texName Name of the texture.
     * @param {string} textureImageAsset Path to the texture image to load.
     * @param {number} frameWidth Width of sprite in spritesheet. -1 for full.
     * @param {number} frameHeight Height of sprite in spritesheet. -1 for full.
     * @param {JSON Object} glyphInfo Object defining additional info for letters to be used as a mapping for writing text.
     * Fonts should have these for displaying letters. Format the ojject like so:
     * {
     *     //height of all letters
     *     height: 8, 
     * 
     *     //letter corrosponding to the location and size defined inside.
     *     'A': {
     *         //the x position in pixels for this character.
     *         x: 0,
     * 
     *         //width in pixels for this character.
     *         width: 8
     *     }
     * }
     * 
     * @returns {Promise} A pending promise which will return the texture reference after complete.
     */
    addTexture(texName, textureImageAsset, frameWidth, frameHeight, glyphInfo = null) {
        return this._createTextureFromAsset(textureImageAsset).then((textureData) => {
            let texObj = this.textures[texName] = Object.assign({
                name: texName,
                id: this._setAvailableTextureID(),
                frameWidth,
                frameHeight,
                glyphInfo,
            }, textureData);
            this.textures[texName].framesWidth = texObj.width / texObj.frameWidth;
            this.textures[texName].framesHeight = texObj.height / texObj.frameHeight;
            return this.textures[texName];
        })
    }

    /**
     * 
     * @param {string} texName The name of the texture.
     * @param {Array *} textureData An array object of data, array type depending on the textureInternalFormat.
     * @param {GLint} textureInternalFormat Internal texture format type.
     * @param {GLint} textureFormat Texture format type.
     * @param {number} frameWidth Width of each sub sprite frame.
     * @param {number} frameHeight Height of each sub sprite frame.
     * @param {number} width Width of the texture.
     * @param {number} height Height of the texture.
     */
    addDataTexture(texName, textureData, textureInternalFormat, textureFormat, textureByteType, frameWidth, frameHeight, width, height) {
        let tex = this._createTextureFromData(textureData, textureInternalFormat, textureFormat, textureByteType, width, height);
        this.textures[texName] = Object.assign({
            name: texName,
            id: this._setAvailableTextureID(),
            frameWidth,
            frameHeight,
            width,
            height,
            framesWidth: width / frameWidth,
            framesHeight: height / frameHeight,
            textureInternalFormat,
            textureFormat,
            textureByteType,
        }, {tex});
        return this.textures[texName];
    }

    /**
     * 
     * @param {string} texName The name of the texture.
     * @param {Array *} textureData An array object of data, array type depending on the textureInternalFormat.
     * @param {GLint} textureInternalFormat Internal texture format type.
     * @param {GLint} textureFormat Texture format type.
     * @param {number} frameWidth Width of each sub sprite frame.
     * @param {number} frameHeight Height of each sub sprite frame.
     * @param {number} width Width of the texture.
     * @param {number} height Height of the texture.
     */
    addCanvasTextTexture(text, fontSize, shadow) {
        let frameWidth = 1;
        let frameHeight = 1;
        let canvas = this._createCanvasForTexture(text, fontSize, shadow);
        let tex = this._createTextureFromCanvas(canvas);
        let name = 'canvasText' + this.textTextureIDCounter++;
        this.textures[name] = Object.assign({
            name,
            canvas,
            id: this._setAvailableTextureID(),
            frameWidth,
            frameHeight,
            width: canvas.width,
            height: canvas.height,
            framesWidth: 1,
            framesHeight: 1,
        }, {tex});
        return this.textures[name];
    }

    removeTexture(texName) {
        if (this.textures[texName] == null)
            return;
        
        let id = this.textures[texName].id;
        this.textureIDs[id] = false;
        delete this.textures[texName];
    }

    updateDataTexture(texName, textureData, x1, y1, width, height) {
        let texture = this.getTexture(texName);
        DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, texture.tex);
        DOMManager.GL.texSubImage2D(DOMManager.GL.TEXTURE_2D, 0, x1, y1, width, height, texture.textureFormat, texture.textureByteType, textureData);
        return texture;
    }

    addGlyphInfoToTexture(texName, glyphInfo) {
        let texture = this.getTexture(texName);
        if (texture == null) {
            console.error('Texture does not exist!');
            return false;
        }
        texture.glyphInfo = glyphInfo;
    }

    _createTextureFromData(texData, textureInternalFormat, textureFormat, textureByteType, width, height) {
        let tex = DOMManager.GL.createTexture();

        DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, tex);
        DOMManager.GL.pixelStorei(DOMManager.GL.UNPACK_FLIP_Y_WEBGL, false);
        
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_MIN_FILTER, DOMManager.GL.NEAREST);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_MAG_FILTER, DOMManager.GL.NEAREST);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_S, DOMManager.GL.CLAMP_TO_EDGE);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_T, DOMManager.GL.CLAMP_TO_EDGE);

        DOMManager.GL.texImage2D(DOMManager.GL.TEXTURE_2D, 0, textureInternalFormat, width, height, 0, textureFormat, textureByteType, texData);

        return tex;
    }

    _createCanvasForTexture(text, fontSize, shadow) {
        const canvas = createCanvas(1, 1);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.textDrawingMode = 'glyph';
        ctx.font = fontSize + 'px Ariel';
    		ctx.textBaseline = "top";
        let textDimensions = ctx.measureText(text);
        canvas.width = textDimensions.width;
        canvas.height = fontSize * 1.1;
        if (shadow) {
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgba(0, 0, 0, 1)";
        }
        ctx.fillStyle = 'white';
        ctx.font = fontSize + 'px Ariel';
    		ctx.textBaseline = "top";
        ctx.fillText(text, 0, 0);
        return canvas;
    }

    _createTextureFromCanvas(canvas) {
        let tex = DOMManager.GL.createTexture();

        DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, tex);
        DOMManager.GL.pixelStorei(DOMManager.GL.UNPACK_FLIP_Y_WEBGL, false);
        
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_MIN_FILTER, DOMManager.GL.NEAREST);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_MAG_FILTER, DOMManager.GL.NEAREST);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_S, DOMManager.GL.CLAMP_TO_EDGE);
        DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_T, DOMManager.GL.CLAMP_TO_EDGE);

        DOMManager.GL.texImage2D(DOMManager.GL.TEXTURE_2D, 0, DOMManager.GL.RGBA, DOMManager.GL.RGBA, DOMManager.GL.UNSIGNED_BYTE, canvas);

        return tex;
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
            framesWidth: 0,
            framesHeight: 0,
        };

        return new Promise((res, rej) => {
            let assetLoaded = new Image();
            assetLoaded.addEventListener('load', () => {
                texInfo.width = assetLoaded.width;
                texInfo.height = assetLoaded.height;

                DOMManager.GL.bindTexture(DOMManager.GL.TEXTURE_2D, texInfo.tex);
               
                DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_S, DOMManager.GL.CLAMP_TO_EDGE);
                DOMManager.GL.texParameteri(DOMManager.GL.TEXTURE_2D, DOMManager.GL.TEXTURE_WRAP_T, DOMManager.GL.CLAMP_TO_EDGE);
        
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