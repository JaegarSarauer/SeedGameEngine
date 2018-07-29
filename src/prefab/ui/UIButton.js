import { ClickController, Point, SceneObject, Renderable2D, UIManager } from '../../entry';
import UIElement from './UIElement';


export default class UIButton extends UIElement {
    constructor(viewport, x, y, w, h, onLeft, onRight = () => {}) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.uiStyle = UIManager.getCurrentStyle();
        this.renderable = null;
        this.viewport = viewport;
        this.onLeftClick = onLeft;
        this.onRightClick = onRight;
    }

    setStyle(uiStyleName) {
        this.uiStyle = UIManager.getStyle(uiStyleName);
    }

    onStart() {
        this.renderable = new Renderable2D();
        this.addComponent(this.renderable);
        this.renderable.addToViewport(this.viewport);
        this.renderable.setTexture(this.uiStyle.buttonTexture);
        this.renderable.setSubIndex(this.uiStyle.buttonSubImage);
        this.renderable.setDepth(-5000);

        this.clickController = new ClickController(this.viewport, () => {
            this.onLeftClick();
            this.renderable.setSubIndex(this.uiStyle.buttonReleasedSubImage);
        }, () => {
            this.onRightClick();
            this.renderable.setSubIndex(this.uiStyle.buttonReleasedSubImage);
        }, () => {
            this.renderable.setSubIndex(this.uiStyle.buttonPressedSubImage);
        }, () => {
            this.renderable.setSubIndex(this.uiStyle.buttonPressedSubImage);
        });
        this.addComponent(this.clickController);
    }
}