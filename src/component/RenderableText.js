import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';
import TextureManager from '../manager/TextureManager';
import RenderManager from '../manager/RenderManager';
import Renderable2DMultitex from './Renderable2DMultitex';

/**
 * Renderable2D is a renderable component which focusses on
 * 2D shaders and matricies for 2D space rendering.
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

    setGridData() {
        //text storage max width of 1024 px.
        let width = 1024;

        //128 lines of text storeable.
        let height = 128; 

        //assigns an ID and sets up the statically used text data texture.
        RenderManager.registerTextRenderable(this, width, height);
        
        this.addTexture(TextureManager.getTexture('TextData'));
        
        //additional data for the shader for font data and such.
        this.buildShaderTileData();
    }

    setText(textString, fontScale) {
        this.textData.text = textString;
        this.textData.textPixelArray = [];
        this.textData.textPixelWidth = 0;
        for (let i = 0; i < textString.length; i++) {
            let char = textString[i];
            let charData = this.fontTexture.glyphInfo[char];
            if (charData == null)
                continue;
            //this.textData.textPixelArray.push((charData.x / 8) + (8 * charData.row));
            for (let x = charData.x; x < charData.x + charData.width; x++) {
                this.textData.textPixelArray.push(x + (charData.row * this.fontTexture.width));
            }
        }
        this.textData.textPixelWidth = this.textData.textPixelArray.length;
        this.gameObject.transform.setScale(this.textData.textPixelWidth * fontScale, this.fontTexture.glyphInfo.height * fontScale);
        TextureManager.updateDataTexture('TextData', new Uint16Array(this.textData.textPixelArray), 0, this.renderableTextID, this.textData.textPixelWidth, 1);
        this.buildShaderTileData();
    }

    buildShaderTileData() {
        this.shaderFontData = [
            1024, 128, 64, 5, 
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
            'u_texture': this.textures[0].id,
            'u_mapDataTexture': this.textures[1].id,
        });
        return true;
    }
}