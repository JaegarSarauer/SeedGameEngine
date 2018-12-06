import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, SceneManager, Viewport, GameObject, Point, Renderable2D, PersistentObject, PersistentManager, SceneObject, Component } from '../../src/entry';

export default class ComponentPatternTest extends Test {
    constructor() {
        super('Component Pattern Test', 7); 
    }
    
    steps() {
        let scene = new Scene();

        SceneManager.addScene(scene);

        let viewport = new Viewport(0, 0, 400, 400);
        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
        let component = new Component(true);
        
        this.addStep('On Component Add to Scene Object', () => {
            return new Promise((res, rej) => {
                component.onAddComponent = () => {
                    return res(true);
                }
            });
        });
        
        this.addStep('Add Component To Scene Object', () => {
            gameObject.addComponent(component);
            return gameObject.hasComponent('Component');
        });

        let component2 = new Component(true);

        this.addStep('Component End By ID', () => {
            return new Promise((res, rej) => {
                component2.onEnd = () => {

                    let isRemoved2 = !gameObject.hasComponent('Component');

                    deregister();
                    SceneManager.removeScene();

                    return res(isRemoved2);
                }
            });
        });

        this.addStep('Component End By Name', () => {
            return new Promise((res, rej) => {
                component.onEnd = () => {

                    let isRemoved = !gameObject.hasComponent('Component');
                    
                    component2.onAddComponent = () => {
                        gameObject.removeComponent(component2.className, component2.id);
                    }
                    gameObject.addComponent(component2);

                    return res(isRemoved);
                }
            });
        });

        this.addStep('Component Unpause', () => {
            return new Promise((res, rej) => {
                component.onUnpause = () => {

                    gameObject.removeComponents('Component');

                    return res(true);
                }
            });
        });

        this.addStep('Component Pause', () => {
            return new Promise((res, rej) => {
                component.onPause = () => {

                    component.unpause();

                    return res(true);
                }
            });
        });

        this.addStep('Component Update', () => {
            return new Promise((res, rej) => {
                component.onUpdate = () => {

                    component.pause();

                    return res(true);
                }
            });
        })
    }
}