import Manager from './Manager';
import { TextureManager } from '../entry';

export class _UIManager extends Manager {
    constructor() {
        super();

        this.defaultStyle = {
            buttonTexture: TextureManager.getTexture('uiButtonDefault'),
            buttonSubImage: 0,
            buttonHoverSubImage: 0,
            buttonPressedSubImage: 1,
            buttonReleasedSubImage: 1,
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