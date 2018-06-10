import Component from './Component';
import SceneManager from '../manager/SceneManager';
import RenderManager from '../manager/RenderManager';
import ProgramManager from '../manager/ProgramManager';
import Matrix3 from '../render/WebGL/Matrix3';
import Color from '../internal/Color';

export default class Renderable extends Component {
    constructor(program, matrix, primitiveType, primitiveCount) {
        super(true);
        this.deregisterViewports = {};

        //currently unused
        this.program = ProgramManager.getProgram('Default');
        this._matrixPosition = new Matrix3();
        this._matrixScale = new Matrix3();
        this._matrixRotation = new Matrix3();
        this._matrixOriginOffset = new Matrix3();
        this.color = new Color();
        this.renderPositions = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];
        this.primitiveType = RenderManager.GL.TRIANGLES;
        this.primitiveCount = 6;
    }

    /**
     * Returns a joined matrix of position, scale and rotation.
     */
    getMatrix() {       
        return Matrix3.copy(this._matrixPosition).multiply(this._matrixRotation).multiply(this._matrixScale).multiply(this._matrixOriginOffset);
    }

    setPosition(point) {
        this._matrixPosition.setPosition(point.x, point.y); //point.z if we had 3D to override this
    }

    setOriginOffset(point) {
        this._matrixOriginOffset.setPosition(point.x, point.y); //point.z if we had 3D to override this
    }

    setRotation(rotation) {
        this._matrixRotation.setRotation(rotation);
    }

    setScale(scale) {
        this._matrixScale.setScale(scale.x, scale.y);
    }

    onAddComponent() {
        let transform = this.gameObject.getComponent("Transform");
        transform.renderable = this;
        this.setPosition(transform.getPosition());
        this.setScale(transform.getScale());
        this.setRotation(transform.getRotation());
    }

    addToViewport(viewportID) {
        this.deregisterViewports[viewportID] = SceneManager.getCurrentScene().registerRenderableComponent(this, viewportID);
        return this;
    }

    removeFromViewport(viewport) {
        let objKeys = Object.keys(this.deregisterViewports);
        for (let i = 0; i < objKeys.length; i++) {
            this.deregisterViewports[objKeys[i]]();
        }
    }
}