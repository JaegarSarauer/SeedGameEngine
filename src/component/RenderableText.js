import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';
import TextureManager from '../manager/TextureManager';
import RenderManager from '../manager/RenderManager';
import { Point } from '../entry';

/**
 * RenderableText is a renderable component which renders a line of text from a 
 * collection of string data. The string data is loaded into the GPU using textures
 */
export default class RenderableText extends Renderable {

    constructor(fontTexture) {
        super(ProgramManager.getProgram('Default'));
        this.className = 'RenderableText';
        this.renderableTextID = -1;
        this.text = null;
        this.textData = {
            //text in string form
            text: '',

            //text in indexable columns of the font texture. Represents an x value and a range of y values (automatically handled by the shader).
            textPixelArray: [],

            //width of the entire string and and formatting in px.
            textPixelWidth: 0
        };
    }

    onPause() {
        this.requestRedraw();
    }

    onUnpause() {
        this.requestRedraw();
    }

    destroyTextTexture() {
        if (this.textures.length > 0) {
            TextureManager.removeTexture(this.textures[0].name);
        }
    }

    onEnd() {
        this.destroyTextTexture();
    }

    setText(textString, shadow, fontSize) {
        if (textString == this.text)
            return;
        this.text = textString;
        this.destroyTextTexture();
        fontSize *= 2;
        if (textString == null || textString.length <= 0)
            textString = ' ';
        let texture = TextureManager.addCanvasTextTexture(textString, fontSize, shadow);
        this.gameObject.transform.setScale(texture.canvas.width / 2, texture.canvas.height / 2);
        this.setTexture(texture);
        this.requestRedraw();
        //this.setScale(400, 100)
        // fontScale = Math.round(fontScale);
        // this.textData.text = textString;
        // this.textData.textPixelArray = [];
        // this.textData.textPixelWidth = 0;
        // for (let i = 0; i < textString.length; i++) {
        //     let char = textString[i];
        //     let charData = this.fontTexture.glyphInfo[char];
        //     if (charData == null)
        //         continue;

        //     for (let x = charData.x; x < charData.x + charData.width; x++) {
        //         this.textData.textPixelArray.push(x + (charData.row * this.fontTexture.width));
        //     }
        // }
        // this.textData.textPixelWidth = this.textData.textPixelArray.length;
        // this.gameObject.transform.setScale(this.textData.textPixelWidth * fontScale, this.fontTexture.glyphInfo.height * fontScale);
        // TextureManager.updateDataTexture('TextData', new Uint16Array(this.textData.textPixelArray), 0, this.renderableTextID, this.textData.textPixelWidth, 1);
        //this.buildShaderTileData();
    }

    setTextAlign(textAlign) {
        if (textAlign == 'center') {
            this.textAlign = 1;
            this.setOriginOffset(new Point(-0.5, 0));
        } else if (textAlign == 'right') {
            this.textAlign = 2;
            this.setOriginOffset(new Point(-1, 0));
        } else {
            this.textAlign = 0;
            this.setOriginOffset(new Point(0, 0));
        }
    }
}