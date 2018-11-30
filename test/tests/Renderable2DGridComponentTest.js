import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Renderable2DGrid, Scene, Viewport, SceneObject, Point, SceneManager, TextureManager, Matrix3 } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class Renderable2DGridComponentTest extends Test {
    constructor() {
        super('Renderable2DGrid Component Test', 7); 
        this.loader = null;
    }
    
    steps() {
        let scene = new Scene();
        let viewport = new Viewport(0, 0, 400, 400);

        SceneManager.addScene(scene);

        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
        let renderable = null;

        this.addStep('Assign Renderable2DGrid to Scene Object', () => {
            renderable = new Renderable2DGrid('Characters', [1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 6, 6, 5, 4, 3, 2], 4, 4, 4, 4);
            return gameObject.addComponent(renderable);
        });

        this.addStep('Renderable2DGrid on Add', () => {
            return new Promise((res, rej) => {
                gameObject.onUpdate = () => {

                    this.addStep('Renderable2DGrid Set Grid Data', () => {
                        renderable.setGridData([6,6,6,6,5,4,3,2,1,1,1,1,5,4,3,2], 4, 4, 4, 4);
                        return renderable.textures[1].name == 'CharactersData0';
                    });

                    this.addStep('Renderable2DGrid Update Grid Data', () => {
                        renderable.updateGridData([2,3,2,3,3,4,3,4,4,5,4,5,5,6,5,6], 0, 0, 4, 4)
                        return true;
                    });

                    this.addStep('Renderable2DGrid Set Uniform Data', () => {
                        return renderable.setUniformData(new Matrix3().m);
                    });

                    this.addStep('Renderable2DGrid onEnd', () => {
                        renderable.end();
                        return viewport.renderables[renderable.id] == null;
                    });

                    this.addStep('Renderable2DGrid Remove from Viewports', () => {
                        deregister();
                        SceneManager.removeScene();
                        return true;
                    });

                    return res(true);
                };
            });
        });
    }
}
