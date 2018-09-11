import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, RenderableText } from '../../entry';

export default class UIText extends UIElement {
    constructor(viewport, x, y, w, h, text) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);

        this.text = text;

        this.textObject = new SceneObject(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.textObject.renderableText = new RenderableText(this.uiStyle.fontTexture);
        this.textObject.addComponent(this.textObject.renderableText);
        this.textObject.renderableText.addToViewport(viewport);
        this.setText(text, h / this.uiStyle.fontTexture.frameHeight);
        this.textObject.renderableText.setDepth(-2000);
    }

    setPosition(x, y) {
        this.transform.setPosition(x, y, 0);
        this.textObject.transform.setPosition(x, y, 0);
    }

    setColor(r, g, b, a) {
        this.textObject.renderableText.setColor(r, g, b, a);
    }

    getText() {
        return this.text;
    }

    setText(text, scale = 1) {
        this.text = text;
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

    setDepth(depth) {
        this.textObject.renderableText.setDepth(depth);
    }

    end() {
        this.textObject.removeAllComponents();
        this.textObject.end();
    }
}