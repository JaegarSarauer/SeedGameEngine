import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIText, UIPanel } from '../../entry';

export default class UIButton extends UIText {
    constructor(viewport, x, y, w, h, text, onLeft, onRight = () => {}) {
        super(viewport, x + (w * .5), y, w, h * .8, text);

        this.buttonObject = new UIPanel(viewport, x, y, w, h, this.uiStyle.buttonTexture);
        this.buttonObject.setSubIndex(this.uiStyle.buttonSubImage);
        this.buttonObject.setColor(this.uiStyle.buttonBackgroundColor.color[0], this.uiStyle.buttonBackgroundColor.color[1], this.uiStyle.buttonBackgroundColor.color[2], this.uiStyle.buttonBackgroundColor.color[3]);
        this.buttonObject.setDepth(1000);

        this.setTextAlign('center');

        this.viewport = viewport;
        this.onLeftClick = onLeft;
        this.onRightClick = onRight;

        this.buttonObject.clickController = new ClickController(this.viewport, () => {
            if (this.buttonObject.clickController.leftPressed) {
                this.buttonObject.setSubIndex(this.uiStyle.buttonReleasedSubImage);
                this.onLeftClick();
                this.buttonObject.clickController.leftPressed = false;
            }
        }, () => {
            if (this.buttonObject.clickController.rightPressed) {
                this.buttonObject.setSubIndex(this.uiStyle.buttonReleasedSubImage);
                this.onRightClick();
                this.buttonObject.clickController.rightPressed = false;
            }
        }, () => {
            this.buttonObject.setSubIndex(this.uiStyle.buttonPressedSubImage);
        }, () => {
            this.buttonObject.setSubIndex(this.uiStyle.buttonPressedSubImage);
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
        this.setText(this.text);
    }

    setDepth(depth) {
        this.textObject.renderableText.setDepth(depth);
        this.buttonObject.setDepth(depth);
    }
}