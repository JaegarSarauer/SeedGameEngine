import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { ClickController, Scene, Viewport, SceneObject, SceneManager, Point } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class ClickControllerComponentTest extends Test {
    constructor() {
        super('Click Controller Component Test', 8); 
        this.loader = null;

        this.results = [null, null, null, null, null, null];
    }
    
    steps() {
        let scene = new Scene();
        
        let viewport = new Viewport(0, 0, 400, 400);

        SceneManager.addScene(scene);

        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(0, 0, 0), new Point(200, 200, 1), 0);
        let clickController = null;
        // renderable.setTexture('');
        // renderable.addToViewport(0);

        this.addStep('Assign Click Controller Component to Scene Object', () => {
            clickController = new ClickController(0, () => {
                this.results[0] = true;
            }, () => {
                this.results[1] = true;
            }, () => {
                this.results[2] = true;
            }, () => {
                this.results[3] = true;
            }, () => {
                this.results[4] = true;
            }, () => {
                this.results[5] = true;
            });
            return gameObject.addComponent(clickController);
        });

        this.addStep('Click Controller Component on Add', () => {
            let once = false;
            return new Promise((res, rej) => {
                gameObject.onUpdate = () => {
                    if (once)
                        return;
                    once = true;

                    this.addStep('On Left Pressed', () => {
                        return new Promise((res, rej) => {
                            let clearTM = setInterval(() => {
                                if (this.results[0] != null) {
                                    clearInterval(clearTM);
                                    return res(this.results[0]);
                                }
                            }, 5);
                        });
                    });
                    this.addStep('On Left Released', () => {
                        return new Promise((res, rej) => {
                            let clearTM = setInterval(() => {
                                if (this.results[2] != null) {
                                    clearInterval(clearTM);
                                    return res(this.results[2]);
                                }
                            }, 5);
                        });
                    });
                    this.addStep('On Left Release Outside', () => {
                        return new Promise((res, rej) => {
                            let clearTM = setInterval(() => {
                                if (this.results[4] != null) {
                                    clearInterval(clearTM);
                                    return res(this.results[4]);
                                }
                            }, 5);
                        });
                    });
                    this.addStep('On Right Pressed', () => {
                        return new Promise((res, rej) => {
                            let clearTM = setInterval(() => {
                                if (this.results[1] != null) {
                                    clearInterval(clearTM);
                                    return res(this.results[1]);
                                }
                            }, 5);
                        });
                    });
                    this.addStep('On Right Released', () => {
                        return new Promise((res, rej) => {
                            let clearTM = setInterval(() => {
                                if (this.results[3] != null) {
                                    clearInterval(clearTM);
                                    return res(this.results[3]);
                                }
                            }, 5);
                        });
                    });
                    this.addStep('On Right Release Outside', () => {
                        return new Promise((res, rej) => {
                            let clearTM = setInterval(() => {
                                if (this.results[5] != null) {
                                    clearInterval(clearTM);
                                    return res(this.results[5]);
                                }
                            }, 5);
                        });
                    });            

                    return res(true);
                };
            });
        });

        console.info('Waiting for mouse input in top left of screen: (0,0) to (400,400).');
    }
}