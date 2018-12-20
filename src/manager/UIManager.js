import Manager from './Manager';
import { TextureManager } from '../entry';
import Color from '../internal/Color';

export class _UIManager extends Manager {
    constructor() {
        super();

        this.defaultStyle = {
            buttonTexture: TextureManager.getTexture('uiButtonDefault'),
            buttonSubImage: 0,
            buttonHoverSubImage: 0,
            buttonPressedSubImage: 1,
            buttonReleasedSubImage: 1,
            buttonBackgroundColor: new Color(0.65, 0, 0, 1),
            textAreaBackgroundColor: new Color(0.65, 0, 0, 1),
            fontTexture: TextureManager.getTexture('fontDefault'),
            textInputBoxTexture: TextureManager.getTexture('uiButtonDefault'),
        };
        this.styles = [];
        this.currentStyle = null;
        this.addStyle('Default', {});
        this.setCurrentStyle('Default');
    }

    /**
     * 
     * 
     * @param {JSONObject} jsonStyleObject A JSON formatted object containing generic drawing data for styles.
     */
    addStyle(uiStyleName, jsonStyleObject) {
        this.styles[uiStyleName] = Object.assign({}, this.defaultStyle, jsonStyleObject);
    }

    setCurrentStyle(uiStyleName) {
        this.currentStyle = this.getStyle(uiStyleName);
    }

    getCurrentStyle() {
        return this.currentStyle;
    }

    getStyle(styleName) {
        let style = this.styles[styleName];

        if (style == null)
            throw 'UI style does not exist!';

        return style;
    }
}

/**
 * Singleton reference to the UIManager.
 */
const UIManager = new _UIManager();
export default UIManager;