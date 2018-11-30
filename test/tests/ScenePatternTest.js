import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, SceneManager } from '../../src/entry';

export default class ScenePatternTest extends Test {
    constructor() {
        super('Scene Pattern Test', 6); 
    }
    
    steps() {
        let scene = null;
        let scene2 = null;
        this.addStep('Create & Add Scene', () => {
            scene = new Scene();
            SceneManager.addScene(scene);
            return true;
        });

        this.addStep('On scene update', () => {
            return new Promise((res, rej) => {
                scene.onUpdate = () => {

                    this.addStep('Stack new scene & is scene 1 paused.', () => {
                        scene2 = new Scene();
                        SceneManager.addScene(scene2);
                        return scene.hasPaused;
                    });
            
                    this.addStep('On scene 2 update', () => {
                        return new Promise((res, rej) => {
                            scene2.onUpdate = () => {
            
                                this.addStep('On scene 2 remove & scene 1 unpaused.', () => {
                                    SceneManager.removeScene();
                                    return !scene.hasPaused;
                                });
            
                                this.addStep('Ending scenes.', () => {
                                    scene.end();
                                    scene2.end();
                                    return true;
                                });

                                return res(true);
                            }
                        });
                    });

                    return res(true);
                }
            });
        });

    }
}