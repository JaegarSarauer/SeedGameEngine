import Component from './Component';
import SceneManager from '../manager/SceneManager';
import RenderManager from '../manager/RenderManager';
import * as VSS from '../const/VertexShader';
import * as FSS from '../const/VertexShader';
import Matrix3 from '../render/WebGL/Matrix3';

export default class Renderable extends Component {
    constructor(program, matrix, primitiveType, primitiveCount) {
        super(true);
        this.deregisterViewports = {};

        //currently unused
        this.program = null;
        this._matrixPosition = new Matrix3();
        this._matrixScale = new Matrix3();
        this._matrixRotation = new Matrix3();
        this.renderPositions = [0, 0, 32, 0, 0, 32, 32, 0, 32, 32, 0, 32];
        this.primitiveType = RenderManager.GL.TRIANGLES;
        this.primitiveCount = 6;
    }

    /**
     * Returns a joined matrix of position, scale and rotation.
     */
    getMatrix() {
        return this._matrixPosition.copy().multiply(this._matrixRotation).multiply(this._matrixScale);
    }

    updatePosition(point) {
        console.info(point)
        this._matrixPosition.setPosition(point.x, point.y); //point.z if we had 3D to override this
    }

    updateScale(scale) {
        this._matrixPosition.setScale(scale.x, scale.y);
    }

    updateRotation(rotation) {
        this._matrixRotation.setRotation(rotation);
    }

    onComponentAdd() {
        this.gameObject.getComponent("Transform").renderable = this;
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