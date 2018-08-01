import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, TextureManager } from '../../entry';

export default class UIPanel extends UIElement {
    constructor(viewport, x, y, w, h, textureName) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);

        this.panelObject = new SceneObject(new Point(x, y, 0), new Point(w, h, 0), 0);
        this.panelObject.renderable = new Renderable2D();
        this.panelObject.addComponent(this.panelObject.renderable);
        this.panelObject.renderable.addToViewport(viewport);
        this.panelObject.renderable.setTexture(TextureManager.getTexture(textureName));
        this.panelObject.renderable.setDepth(2000);
    }

    onPause() {
        this.panelObject.pause();
    }

    onUnpause() {
        this.panelObject.unpause();
    }
}