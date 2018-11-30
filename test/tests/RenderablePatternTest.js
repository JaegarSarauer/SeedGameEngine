import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { Scene, SceneManager, Viewport, GameObject, Point, Renderable2D, PersistentObject, PersistentManager, SceneObject, TextureManager, Matrix3 } from '../../src/entry';
import { degToRad } from '../../src/utils/MathUtil';

export default class RenderablePatternTest extends Test {
    constructor() {
        super('Renderable Pattern Test', 11); 
    }
    
    steps() {
        let scene = new Scene();
        let viewport = new Viewport(0, 0, 400, 400);

        SceneManager.addScene(scene);

        let deregister = scene.registerViewport(viewport);
        let gameObject = new SceneObject(new Point(10, 10, 10), new Point(10, 10, 1), 45);
        let renderable = null;

        this.addStep('Assign Renderable to Scene Object', () => {
            renderable = new Renderable2D();
            return gameObject.addComponent(renderable);
        });

        this.addStep('Renderable on Add', () => {
            return new Promise((res, rej) => {
                gameObject.onUpdate = () => {

                    this.addStep('Renderable Get Matrix', () => {
                        let m3 = renderable.getMatrix().m;
                        return this.equals(m3[0], 7.0710678118654755) && this.equals(m3[1], -7.071067811865475) && 
                            this.equals(m3[2], 0) && this.equals(m3[3], 7.071067811865475) && this.equals(m3[4], 7.0710678118654755) &&
                            this.equals(m3[5], 0) && this.equals(m3[6], 10) && this.equals(m3[7], 10) && this.equals(m3[8], 1);
                    });

                    this.addStep('Renderable Set Color', () => {
                        renderable.setColor(-1, 0.3, 0.9, 2.2);
                        return this.equals(renderable.color.color[0], 0) && this.equals(renderable.color.color[1], 0.3) && 
                            this.equals(renderable.color.color[2], 0.9) && this.equals(renderable.color.color[3], 1);
                    });

                    this.addStep('Renderable Set Texture', () => {
                        let texture = TextureManager.getTexture('Characters');
                        renderable.setTexture(texture);
                        return renderable.textures[0].name == texture.name;
                    });

                    this.addStep('Renderable Set Image Sub Index', () => {
                        renderable.setSubIndex(2);
                        return this.equals(renderable._subSpriteData[0], -2) && this.equals(renderable._subSpriteData[1], 0) && this.equals(renderable._subSpriteData[2], 0.125) && this.equals(renderable._subSpriteData[3], 0.125);
                    });

                    this.addStep('Renderable Set Uniform Data', () => {
                        return renderable.setUniformData(new Matrix3().m);
                    });

                    this.addStep('Renderable Set Position', () => {
                        renderable.setPosition(new Point(-20, -15));
                        return this.equals(renderable._matrixPosition.m[6], -20) && this.equals(renderable._matrixPosition.m[7], -15);
                    });

                    this.addStep('Renderable Set Scale', () => {
                        renderable.setScale(new Point(2, 3));
                        return this.equals(renderable._matrixScale.m[0], 2) && this.equals(renderable._matrixScale.m[4], 3);
                    });

                    this.addStep('Renderable Set Rotation', () => {
                        renderable.setRotation(135);
                        return this.equals(renderable._matrixRotation.m[0], -0.7071067811865475) && this.equals(renderable._matrixRotation.m[1], -0.7071067811865476)
                        && this.equals(renderable._matrixRotation.m[3], 0.7071067811865476) && this.equals(renderable._matrixRotation.m[4], -0.7071067811865475);
                    });

                    this.addStep('Renderable onEnd', () => {
                        renderable.end();
                        return viewport.renderables[renderable.id] == null;
                    });

                    this.addStep('Renderable Remove from Viewports', () => {
                        deregister();
                        SceneManager.removeScene();
                        return true;
                    });



                    let transform = gameObject.getComponent('Transform');
                    let pos = this.equals(transform.getPosition().x, renderable._matrixPosition.m[6]) && this.equals(transform.getPosition().y, renderable._matrixPosition.m[7]);
                    let scale = this.equals(transform.getScale().x, renderable._matrixScale.m[0]) && this.equals(transform.getScale().y, renderable._matrixScale.m[4]);
                    let rotate = this.equals(Math.cos(degToRad(transform.getRotation())), renderable._matrixRotation.m[0]) && this.equals(Math.sin(degToRad(transform.getRotation())), renderable._matrixRotation.m[3]);
                    return res(transform.renderable == renderable && pos && scale && rotate);
                };
            });
        });
    }
}
