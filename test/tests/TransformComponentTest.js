import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, SceneManager, Viewport, GameObject, Point, Renderable2D, PersistentObject, PersistentManager, SceneObject, Component, Transform } from '../../src/entry';

export default class TransformComponentTest extends Test {
    constructor() {
        super('Transform Component Test', 9); 
    }
    
    steps() {
        let scene = new Scene();

        SceneManager.addScene(scene);

        let viewport = new Viewport(0, 0, 400, 400);
        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
        let component = gameObject.getComponent('Transform');
        // gameObject.addComponent(component);
        
        this.addStep('Transform Set Position', () => {
            component.setPosition(4, 5, 6);
            return this.equals(component.getPosition().x, 4) && this.equals(component.getPosition().y, 5) && this.equals(component.getPosition().z, 6);
        });

        this.addStep('Transform Set Scale', () => {
            component.setScale(2, 3);
            return this.equals(component.getScale().x, 2) && this.equals(component.getScale().y, 3);
        });

        this.addStep('Transform Set Rotation', () => {
            component.setRotation(45);
            return this.equals(component.getRotation(), 45);
        });

        this.addStep('Transform Set Origin Offset', () => {
            component.setOriginOffset(20, 18, 16);
            return this.equals(component.getOriginOffset().x, 20) && this.equals(component.getOriginOffset().y, 18) && this.equals(component.getOriginOffset().z, 16);
        });

        this.addStep('Transform Center Origin', () => {
            component.centerOrigin();
            let isCentered = this.equals(component.getOriginOffset().x, -0.5) && this.equals(component.getOriginOffset().y, -0.5) && this.equals(component.getOriginOffset().z, -0.5)
            component.centerOrigin(false);
            return isCentered && this.equals(component.getOriginOffset().x, 0) && this.equals(component.getOriginOffset().y, 0) && this.equals(component.getOriginOffset().z, 0);
        });
        
        this.addStep('Transform Translate', () => {
            component.translate(-8, -10, -12);
            return this.equals(component.getPosition().x, -4) && this.equals(component.getPosition().y, -5) && this.equals(component.getPosition().z, -6);
        });

        this.addStep('Transform Scale', () => {
            component.scale(-4, -6);
            return this.equals(component.getScale().x, -2) && this.equals(component.getScale().y, -3);
        });

        this.addStep('Transform Rotate', () => {
            component.rotate(-90);
            return this.equals(component.getRotation(), -45);
        });

        this.addStep('Transform Flip X/Y', () => {
            component.flipX();
            component.flipY();
            component.flipX();
            component.flipY();
            return this.equals(component.getScale().x, -2) && this.equals(component.getScale().y, -3);
        });
    }
}