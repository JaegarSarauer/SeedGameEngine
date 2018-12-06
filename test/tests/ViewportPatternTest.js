import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, SceneManager, Viewport, GameObject, Point, Renderable2D } from '../../src/entry';

export default class ViewportPatternTest extends Test {
    constructor() {
        super('Viewport Pattern Test', 4); 
    }
    
    steps() {
        let scene = null;
        let viewport = null;
        let gameObject = null;
        let renderable = null;
        let deregister = null;
        this.addStep('Create Scene & Add Viewport', () => {
            scene = new Scene();
            viewport = new Viewport(0, 0, 400, 400);
            SceneManager.addScene(scene);
            deregister = scene.registerViewport(viewport);
            return scene.viewports[0] == viewport;
        });
        this.addStep('Add Renderable to Viewport', () => {
            gameObject = new GameObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
            renderable = new Renderable2D();
            renderable.setTexture('');
            gameObject.addComponent(renderable);
            renderable.addToViewport(0);
            return viewport.renderables[renderable.id] == renderable;
        })
        this.addStep('Remove Renderable from Viewport', () => {
            renderable.removeFromViewports();
            return viewport.renderables[renderable.id] == null;
        });
        this.addStep('Remove Viewport from Scene', () => {
            deregister();
            SceneManager.removeScene();
            return scene.viewports.length == 0;
        });
    }
}