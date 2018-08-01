import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, RenderableText } from '../../entry';

export default class UIText extends UIElement {
    constructor(viewport, x, y, w, h, text) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);

        this.textObject = new SceneObject(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.textObject.renderableText = new RenderableText(this.uiStyle.fontTexture);
        this.textObject.addComponent(this.textObject.renderableText);
        this.textObject.renderableText.addToViewport(viewport);
        this.setText(text, h / this.uiStyle.fontTexture.frameHeight);
        this.textObject.renderableText.setDepth(-2000);
    }

    setText(text, scale = 1) {
        this.textObject.renderableText.setText(text, scale);
    }

    onPause() {
        this.textObject.pause();
        this.textObject.renderableText.pause();
    }

    onUnpause() {
        this.textObject.unpause();
        this.textObject.renderableText.unpause();
    }
}