import Manager from './Manager';
import DOMManager from './DOMManager';
import ProgramManager from './ProgramManager';
import SceneManager from './SceneManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';
import Matrix3 from '../render/WebGL/Matrix3';

export class _RenderManager extends Manager {
    constructor() {
        super();
        this.GL = null;
        this.currentProgram = null;
    }

    /**
     * Initial setup on GL rendering. 
     */
    start() {
        this.GL = DOMManager.GL;

        this._updateProgram(ProgramManager.getProgram('Default'));
        
        this.positionAttributeLocation = this.GL.getAttribLocation(this.currentProgram.program, "a_position");
        this.colorLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_color");
        this.matrixLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_matrix");

        let positionBuffer = this.GL.createBuffer();

        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, positionBuffer);

        this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), this.GL.STATIC_DRAW);

        this.vao = this.GL.createVertexArray();

        this.GL.bindVertexArray(this.vao);

        this.GL.enableVertexAttribArray(this.positionAttributeLocation);

        let size = 2;
        let type = this.GL.FLOAT;
        let normalize = false;
        let stride = 0;
        let vertexOffset = 0;
        this.GL.vertexAttribPointer(this.positionAttributeLocation, size, type, normalize, stride, vertexOffset);
    }

    /**
     * Checks if the program for the next object to draw must be changed.
     * If it does, it will change WebGL programs.
     * 
     * @param {ProgramObject} program A program object returned from ProgramManager.getProgram()
     */
    _updateProgram(program) {
        if (this.currentProgram == null || this.currentProgram.id != program.id) {
            console.info('switching programs')
            this.GL.useProgram(program.program);
            this.currentProgram = program;
        }
    }

    /**
     * Update function for updating all renderable objects in each viewport in the current scene.
     */
    update() {
        this.GL.clearColor(0, 0, 0, 0);
    
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);

        let viewports = SceneManager.getCurrentScene().viewports;

        for (let vi = 0; vi < viewports.length; vi++) {
            let viewport = viewports[vi];

            let viewPortWidth = viewport.bounds.p2.x - viewport.bounds.p1.x;
            let viewPortHeight = viewport.bounds.p2.y - viewport.bounds.p1.y;

            this.GL.viewport(viewport.bounds.p1.x, viewport.bounds.p1.y, viewport.bounds.p2.x, viewport.bounds.p2.y);

            //setup camera from viewport

            let renderables = viewport.renderables;
            let renderableKeys = Object.keys(renderables);
            for (let ri = 0; ri < renderableKeys.length; ri++) {
                let renderable = renderables[renderableKeys[ri]];

                this._updateProgram(renderable.program);

                this.GL.uniform4fv(this.colorLocation, renderable.color.color);
                this.GL.uniformMatrix3fv(this.matrixLocation, false, Matrix3.projection(viewPortWidth, viewPortHeight).multiply(renderable.getMatrix()).m);


                this.GL.drawArrays(renderable.primitiveType, 0, renderable.primitiveCount);
            }
        }
    }
}

/**
 * Singleton reference to the Rendering Manager.
 */
const RenderManager = new _RenderManager();
export default RenderManager;