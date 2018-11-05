import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, TextureManager } from '../../entry';

export default class UIPanel extends UIElement {
    constructor(viewport, x, y, w, h, texture) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);

        this.panelObject = new SceneObject(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.panelObject.renderable = new Renderable2D();
        this.panelObject.addComponent(this.panelObject.renderable);
        this.panelObject.renderable.addToViewport(viewport);
        this.panelObject.renderable.setTexture(texture);
        this.panelObject.renderable.setDepth(2000);
    }

    setPosition(x, y) {
        this.transform.setPosition(x, y, 0);
        this.panelObject.transform.setPosition(x, y, 0);
    }

    setScale(x, y) {
        this.transform.setScale(x, y, 0);
        this.panelObject.transform.setScale(x, y, 0);
    }

    setColor(r, g, b, a) {
        this.panelObject.renderable.setColor(r, g, b, a);
    }

    onPause() {
        this.panelObject.pause();
        this.panelObject.renderable.pause();
    }

    onUnpause() {
        this.panelObject.unpause();
        this.panelObject.renderable.unpause();
    }

    setSubIndex(index) {
        this.panelObject.renderable.setSubIndex(index);
    }

    setDepth(depth) {
        this.panelObject.renderable.setDepth(depth);
    }

    onEnd() {
        this.panelObject.renderable.end();
        this.panelObject.end();
    }
}