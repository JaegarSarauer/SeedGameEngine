import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, RenderableText } from '../../entry';

export default class UIText extends UIElement {
    constructor(viewport, x, y, w, h, text, shadow = false) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);

        this.text = text;
        this.shadow = shadow;
        this.currentTextScale = 16;

        this.textObject = new SceneObject(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.textObject.renderableText = new RenderableText(this.uiStyle.fontTexture);
        this.textObject.addComponent(this.textObject.renderableText);
        this.textObject.renderableText.addToViewport(viewport);
        this.setText(text, shadow, h);
        this.textObject.renderableText.setDepth(-2000);
    }

    setTextAlign(textAlign) {
        this.textObject.renderableText.setTextAlign(textAlign);
        return this;
    }

    translate(x, y) {
        this.transform.translate(x, y);
        this.textObject.transform.translate(x, y);
    }

    setPosition(x, y) {
        this.transform.setPosition(x, y, 0);
        this.textObject.transform.setPosition(x, y, 0);
    }

    setColor(r, g, b, a) {
        this.textObject.renderableText.setColor(r, g, b, a);
        return this;
    }

    getTextWidth() {
        return this.textObject.transform.getScale().x;
    }

    getText() {
        return this.text;
    }

    setText(text, shadow, scale = this.currentTextScale) {
        this.text = text;
        this.shadow = shadow;
        this.currentTextScale = Math.max(1, scale);
        this.textObject.renderableText.setText(text, shadow, this.currentTextScale);
    }

    onPause() {
        this.textObject.pause();
        this.textObject.renderableText.pause();
    }

    onUnpause() {
        this.textObject.unpause();
        this.textObject.renderableText.unpause();
        this.setText(this.text);
    }

    setDepth(depth) {
        this.textObject.renderableText.setDepth(depth);
        return this;
    }

    end() {
        this.textObject.removeAllComponents();
        this.textObject.end();
    }
}