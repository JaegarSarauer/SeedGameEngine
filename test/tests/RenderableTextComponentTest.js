import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, Viewport, SceneObject, Point, SceneManager, TextureManager, Matrix3, RenderableText } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class RenderableTextComponentTest extends Test {
    constructor() {
        super('RenderableText Component Test', 6); 
        this.loader = null;
    }
    
    steps() {
        let scene = new Scene();
        let viewport = new Viewport(0, 0, 400, 400);

        SceneManager.addScene(scene);

        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
        let renderable = null;

        this.addStep('Assign RenderableText to Scene Object', () => {
            renderable = new RenderableText(TextureManager.getTexture('DefaultFont'));
            return gameObject.addComponent(renderable);
        });

        this.addStep('RenderableText on Add', () => {
            return new Promise((res, rej) => {
                gameObject.onUpdate = () => {

                    this.addStep('RenderableText Set Text', () => {
                        renderable.setText('Some test text.', 1);
                        return renderable.textData.textPixelWidth == 137;
                    });

                    this.addStep('RenderableText Set Uniform Data', () => {
                        return renderable.setUniformData(new Matrix3().m);
                    });

                    this.addStep('RenderableText onEnd', () => {
                        renderable.end();
                        return viewport.renderables[renderable.id] == null;
                    });

                    this.addStep('RenderableText Remove from Viewports', () => {
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
