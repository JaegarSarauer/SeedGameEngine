import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, TextureManager } from '../../entry';

export default class UIPanel extends UIElement {
    constructor(viewport, x, y, w, h, textureName) {
        super(new Point(x, y, 0), new Point(1600, 402, 0), 0);

        this.panel = new Renderable2D();
        this.addComponent(this.panel);
        this.panel.addToViewport(viewport);
        this.panel.setTexture(TextureManager.getTexture(textureName));
        this.panel.setDepth(2000);
    }

    onPause() {
        this.panel.pause();
    }

    onUnpause() {
        this.panel.unpause();
    }
}