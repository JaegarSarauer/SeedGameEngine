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
        this.depthLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_depth");

        //textures
        this.texcoordAttributeLocation = this.GL.getAttribLocation(this.currentProgram.program, "a_texcoord");
        this.textureLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_texture");
        this.subTexcoordLocation = this.GL.getUniformLocation(this.currentProgram.program, "u_subTexcoord");

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

        //textures
        this.texcoordBuffer = this.GL.createBuffer();
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, this.texcoordBuffer);
        this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), this.GL.STATIC_DRAW);

        // Turn on the attribute
        this.GL.enableVertexAttribArray(this.texcoordAttributeLocation);

        // Tell the attribute how to get data out of colorBuffer (ARRAY_BUFFER)
        let t_size = 2;          // 3 components per iteration
        let t_type = this.GL.FLOAT;   // the data is 32bit floats
        let t_normalize = true;  // convert from 0-255 to 0.0-1.0
        let t_stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next color
        let t_offset = 0;        // start at the beginning of the buffer
        this.GL.vertexAttribPointer(
            this.texcoordAttributeLocation, t_size, t_type, t_normalize, t_stride, t_offset);

        this.GL.enable(this.GL.DEPTH_TEST);
        this.GL.depthFunc(this.GL.LESS);      
        this.GL.enable(this.GL.BLEND);
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
        this.GL.clearDepth(1.0);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);

        let scene = SceneManager.getCurrentScene();
        
        if (scene == null)
            return;

        let viewports = scene.viewports;

        for (let vi = 0; vi < viewports.length; vi++) {
            let viewport = viewports[vi];

            let viewPortWidth = viewport.bounds.p2.x;
            let viewPortHeight = viewport.bounds.p2.y;

            this.GL.viewport(viewport.bounds.p1.x, viewport.bounds.p1.y, viewPortWidth, viewPortHeight);

            //setup camera from viewport

            let renderables = viewport.renderables;
            let renderableKeys = Object.keys(renderables);
            for (let ri = 0; ri < renderableKeys.length; ri++) {
                let renderable = renderables[renderableKeys[ri]];

                if (!renderable.enabled)
                    continue;

                this._updateProgram(renderable.program);

                this.GL.uniform4fv(this.colorLocation, renderable.color.color);
                this.GL.uniform4fv(this.subTexcoordLocation, renderable._subSpriteData);
                this.GL.uniform1f(this.depthLocation, renderable.depth);
                this.GL.uniformMatrix3fv(this.matrixLocation, false, Matrix3.projection(viewPortWidth, viewPortHeight).multiply(renderable.getMatrix()).m);

                this.GL.uniform1i(this.textureLocation, renderable.texture.id);
 
                this.GL.activeTexture(this.GL.TEXTURE0 + renderable.texture.id);
                this.GL.bindTexture(this.GL.TEXTURE_2D, renderable.texture.tex);

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