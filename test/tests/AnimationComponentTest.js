import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Animation, Scene, Viewport, SceneObject, SceneManager, Point } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class AnimationComponentTest extends Test {
    constructor() {
        super('Animation Component Test', 8); 
        this.loader = null;
    }
    
    steps() {
        let scene = new Scene();
        
        let viewport = new Viewport(0, 0, 400, 400);

        SceneManager.addScene(scene);

        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(0, 0, 0), new Point(1, 1, 1), 0);
        let animation = null;
        // renderable.setTexture('');
        // renderable.addToViewport(0);

        this.addStep('Assign Animation Component to Scene Object', () => {
            animation = new Animation();
            return gameObject.addComponent(animation);
        });

        this.addStep('Animation Component on Add', () => {
            let once = false;
            return new Promise((res, rej) => {
                gameObject.onUpdate = () => {
                    if (once)
                        return;
                    once = true;

                    this.addStep('Build Interpolation', () => {
                        return new Promise((res, rej) => {
                            let end = false;
                            let clearTM = setInterval(() => {
                                if (end) {
                                    clearInterval(clearTM);

                                    this.addStep('Interpolate Position', () => {
                                        animation.interpolatePosition(-1, -5, 0, 4);
                                        return new Promise((res, rej) => {
                                            let clearTM = setInterval(() => {
                                                if (this.equals(gameObject.transform.getPosition().x, -1) && this.equals(gameObject.transform.getPosition().y, -19)) {
                                                    clearInterval(clearTM);
                                                    return res(true);
                                                }
                                            }, 5);
                                        });
                                    });

                                    this.addStep('Interpolate Scale', () => {
                                        animation.interpolateScale(2, 2, 0, 2);
                                        return new Promise((res, rej) => {
                                            let clearTM = setInterval(() => {
                                                if (this.equals(gameObject.transform.getScale().x, 5) && this.equals(gameObject.transform.getScale().y, 5)) {
                                                    clearInterval(clearTM);
                                                    return res(true);
                                                }
                                            }, 5);
                                        });
                                    });

                                    this.addStep('Interpolate Rotation', () => {
                                        animation.interpolateRotation(21, 5);
                                        return new Promise((res, rej) => {
                                            let clearTM = setInterval(() => {
                                                if (this.equals(gameObject.transform.getRotation(), 105)) {
                                                    clearInterval(clearTM);

                                                    this.addStep('Clear All Animations', () => {
                                                        animation.clearAnimations();
                                                        deregister();
                                                        SceneManager.removeScene();
                                                        return true;
                                                    });

                                                    return res(true);
                                                }
                                            }, 5);
                                        });
                                    });
                                    
                                    return res(this.equals(gameObject.transform.getPosition().x, 3) && this.equals(gameObject.transform.getPosition().y, 1));
                                }
                            }, 5);
                            animation.buildInterpolation('TestAnim', 4, () => {
                                gameObject.transform.translate(1, 0);
                            }, () => {
                                gameObject.transform.translate(0, 1);
                                end = true; 
                            });
                        });
                    });

                    this.addStep('Clear Animation', () => {
                        animation.buildInterpolation('TestAnim2', 4, () => {
                            gameObject.transform.translate(1, 0);
                        }, () => {
                            gameObject.transform.translate(0, 1);
                            end = true; 
                        });
                        animation.clearAnimation('TestAnim2');
                        return !animation.isAnimating('TestAnim2');
                    });

                    return res(true);
                };
            });
        });
    }
}
