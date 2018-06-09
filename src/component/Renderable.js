import Component from './Component';
import SceneManager from '../manager/SceneManager';
import RenderManager from '../manager/RenderManager';
import * as VSS from '../const/VertexShader';
import * as FSS from '../const/VertexShader';

export default class Renderable extends Component {
    constructor(program, matrix, primitiveType, primitiveCount) {
        super();
        this.deregisterViewports = {};
        this.program = null;
        this.matrix = null;
        this.primitiveType = null;
        this.primitiveCount = null;
    }

    onStart() {
        this.init();
    }

    init() {
        return;
        this.program = RenderManager.createProgram();
        this.matrix = new Matrix3();
        this.primitiveType = RenderManager.GL.TRIANGLES;
        this.primitiveCount = 2;
    }

    addToViewport(viewportID) {
        this.deregisterViewports[viewportID] = SceneManager.getCurrentScene().registerRenderableComponent(this, viewportID);
    }

    removeFromViewport(viewport) {
        let objKeys = Object.keys(this.deregisterViewports);
        for (let i = 0; i < objKeys.length; i++) {
            this.deregisterViewports[objKeys[i]]();
        }
    }
}