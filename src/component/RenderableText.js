import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';
import TextureManager from '../manager/TextureManager';
import RenderManager from '../manager/RenderManager';
import Renderable2DMultitex from './Renderable2DMultitex';

/**
 * RenderableText is a renderable component which renders a line of text from a 
 * collection of string data. The string data is loaded into the GPU using textures
 */
export default class RenderableText extends Renderable2DMultitex {

    constructor(fontTexture) {
        super(ProgramManager.getProgram('2DGrid'));
        this.className = 'RenderableText';
        this.renderableTextID = -1;
        this.textData = {
            //text in string form
            text: '',

            //text in indexable columns of the font texture. Represents an x value and a range of y values (automatically handled by the shader).
            textPixelArray: [],

            //width of the entire string and and formatting in px.
            textPixelWidth: 0
        };

        /*
        An array representing a matrix4. Should be replaced with a Matrix4 instance.

        [0][0] = 0 = Map data tiles width.
        [0][1] = 1 = Map data tiles height.
        [0][2] = 2 = Map tiles in the texture width.
        [0][3] = 3 = Map tiles in the texture height.

        [1][0] = 4 = Map viewport width.
        [1][1] = 5 = Map viewport height.
        [1][2] = 6 = Map viewport x1.
        [1][3] = 7 = Map viewport y1.

        [2][0] = 8 = TileSize width normalized.
        [2][1] = 9 = TileSize height normalized. 
        */
        this.shaderFontData = [];
        this.fontTexture = fontTexture;
        this.addTexture(fontTexture);
        this.setGridData();
    }

    onPause() {
        this.requestRedraw();
    }

    onUnpause() {
        this.requestRedraw();
    }

    setGridData() {
        //text storage max width of 1024 px.
        let width = 1024;

        //1024 lines of text storeable.
        let height = 1024; 

        //assigns an ID and sets up the statically used text data texture.
        RenderManager.registerTextRenderable(this, width, height);
        
        this.addTexture(TextureManager.getTexture('TextData'));
        
        //additional data for the shader for font data and such.
        this.buildShaderTileData();
    }

    setText(textString, fontScale) {
        fontScale = Math.round(fontScale);
        this.textData.text = textString;
        this.textData.textPixelArray = [];
        this.textData.textPixelWidth = 0;
        for (let i = 0; i < textString.length; i++) {
            let char = textString[i];
            let charData = this.fontTexture.glyphInfo[char];
            if (charData == null)
                continue;

            for (let x = charData.x; x < charData.x + charData.width; x++) {
                this.textData.textPixelArray.push(x + (charData.row * this.fontTexture.width));
            }
        }
        this.textData.textPixelWidth = this.textData.textPixelArray.length;
        this.gameObject.transform.setScale(this.textData.textPixelWidth * fontScale, this.fontTexture.glyphInfo.height * fontScale);
        TextureManager.updateDataTexture('TextData', new Uint16Array(this.textData.textPixelArray), 0, this.renderableTextID, this.textData.textPixelWidth, 1);
        this.buildShaderTileData();
    }

    setTextAlign(textAlign) {
        if (textAlign == 'center') {
            this.textAlign = 1;
        } else if (textAlign == 'right') {
            this.textAlign = 2;
        } else {
            this.textAlign = 0;
        }
    }

    buildShaderTileData() {
        this.shaderFontData = [
            1024, 1024, this.fontTexture.width, Math.floor(this.fontTexture.height / this.fontTexture.frameHeight), 
            this.textData.textPixelWidth, 1, 0, this.renderableTextID, 
            0.015625, 0.2, 1, 1, 
            1, 1, 1, 1
        ];
    }

    setUniformData(positionMatrix) {
        if (this.textures.length < 2)
            return false;
        this.program.setUniforms({
            'u_color': this.color.color,
            'u_matrix': positionMatrix,
            'u_depth': this.depth,
            'u_tileData': this.shaderFontData,
            'u_texture': 0,
            'u_mapDataTexture': 1,
        });
        return true;
    }
}