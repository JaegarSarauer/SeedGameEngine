import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, SceneManager, Viewport, GameObject, Point, Renderable2D, PersistentObject, PersistentManager, SceneObject } from '../../src/entry';

export default class GameObjectPatternTest extends Test {
    constructor() {
        super('Game Object Pattern Test', 10); 
    }
    
    steps() {
        let scene = null;
        let viewport = null;
        let gameObject = null;
        let deregister = null;
        let pObject = null;

        this.addStep('Create Persistent Object', () => {
            pObject = new PersistentObject(new Point(10, 10, 10), new Point(5, 5, 5), 0);
            return PersistentManager.persistentObjects[pObject.id] == pObject;
        });

        this.addStep('Persistent Object End', () => {
            return new Promise((res, rej) => {
                pObject.onEnd = () => {

                    return res(true);
                }
            });
        });

        this.addStep('Persistent Object Unpause', () => {
            return new Promise((res, rej) => {
                pObject.onUnpause = () => {

                    pObject.end();

                    return res(true);
                }
            });
        });

        this.addStep('Persistent Object Pause', () => {
            return new Promise((res, rej) => {
                pObject.onPause = () => {

                    pObject.unpause();

                    return res(true);
                }
            });
        });

        this.addStep('Persistent Object Update', () => {
            return new Promise((res, rej) => {
                pObject.onUpdate = () => {

                    pObject.pause();

                    return res(true);
                };
            });
        });

        scene = new Scene();
        viewport = new Viewport(0, 0, 400, 400);
        SceneManager.addScene(scene);
        deregister = scene.registerViewport(viewport);
        
        this.addStep('Create Scene Object', () => {
            gameObject = new SceneObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
            return scene.sceneObjects[0] == gameObject;
        });


        this.addStep('Scene Object End', () => {
            return new Promise((res, rej) => {
                gameObject.onEnd = () => {

                    deregister();
                    SceneManager.removeScene();

                    return res(true);
                }
            });
        });

        this.addStep('Scene Object Unpause', () => {
            return new Promise((res, rej) => {
                gameObject.onUnpause = () => {

                    gameObject.end();

                    return res(true);
                }
            });
        });

        this.addStep('Scene Object Pause', () => {
            return new Promise((res, rej) => {
                gameObject.onPause = () => {

                    gameObject.unpause();

                    return res(true);
                }
            });
        });

        this.addStep('Scene Object Update', () => {
            return new Promise((res, rej) => {
                gameObject.onUpdate = () => {

                    gameObject.pause();

                    return res(true);
                }
            });
        })
    }
}