import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIText } from '../../entry';

export default class UIButton extends UIText {
    constructor(viewport, x, y, w, h, text, onLeft, onRight = () => {}) {
        super(viewport, x + (w * .2), y, w, h * .8, text);

        this.buttonObject = new SceneObject(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.buttonObject.renderable = new Renderable2D();
        this.buttonObject.addComponent(this.buttonObject.renderable);
        this.buttonObject.renderable.addToViewport(viewport);
        this.buttonObject.renderable.setTexture(this.uiStyle.buttonTexture);
        this.buttonObject.renderable.setSubIndex(this.uiStyle.buttonSubImage);
        this.buttonObject.renderable.setDepth(-1000);

        this.viewport = viewport;
        this.onLeftClick = onLeft;
        this.onRightClick = onRight;
        this.leftPressed = false;
        this.rightPressed = false;

        this.buttonObject.clickController = new ClickController(this.viewport, () => {
            if (this.leftPressed) {
                this.buttonObject.renderable.setSubIndex(this.uiStyle.buttonReleasedSubImage);
                this.onLeftClick();
                this.leftPressed = false;
            }
        }, () => {
            if (this.rightPressed) {
                this.buttonObject.renderable.setSubIndex(this.uiStyle.buttonReleasedSubImage);
                this.onRightClick();
                this.rightPressed = false;
            }
        }, () => {
            this.leftPressed = true;
            this.buttonObject.renderable.setSubIndex(this.uiStyle.buttonPressedSubImage);
        }, () => {
            this.rightPressed = true;
            this.buttonObject.renderable.setSubIndex(this.uiStyle.buttonPressedSubImage);
        });
        this.buttonObject.addComponent(this.buttonObject.clickController);
    }

    onPause() {
        this.textObject.pause();
        this.textObject.renderableText.pause();
        this.buttonObject.pause();
        this.buttonObject.clickController.pause();
    }

    onUnpause() {
        this.textObject.unpause();
        this.textObject.renderableText.unpause();
        this.buttonObject.unpause();
        this.buttonObject.clickController.unpause();
    }
}