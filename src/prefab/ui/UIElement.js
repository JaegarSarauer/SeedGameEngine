import { ClickController, Point, SceneObject, Renderable2D, UIManager } from '../../entry';

export default class UIElement extends SceneObject {
    constructor(position, scale, rotation) {
        super(position, scale, rotation);
        this.uiStyle = UIManager.getCurrentStyle();
    }

    setStyle(uiStyleName) {
        this.uiStyle = UIManager.getStyle(uiStyleName);
    }
}