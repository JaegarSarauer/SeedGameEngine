import Manager from './Manager';
import DOMManager from './DOMManager';
import ProgramManager from './ProgramManager';
import SceneManager from './SceneManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';
import Matrix3 from '../render/WebGL/Matrix3';

/**
 * Manages the WebGL2 rendering of all renderable components in the scene.
 * This manager is not intended to be referenced directly.
 */
export class _RenderManager extends Manager {
    constructor() {
        super();
        this.GL = null;
        this.currentProgram = null;
        this.activeTextureID = -1;
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

        this.vao = this.GL.createVertexArray();
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

    _updatePositionsBuffer(buffer, positions) {
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, buffer);
        this.GL.bufferData(this.GL.ARRAY_BUFFER, positions, this.GL.DYNAMIC_DRAW);
    }

    _bindVAO(vao, attribLocation) {
        this.GL.bindVertexArray(vao);
        this.GL.enableVertexAttribArray(attribLocation);

        let size = 2;
        let type = this.GL.FLOAT;
        let normalize = false;
        let stride = 0;
        let vertexOffset = 0;
        this.GL.vertexAttribPointer(attribLocation, size, type, normalize, stride, vertexOffset);
    }

    /**
     * Update function for updating all renderable objects in each viewport in the current scene.
     */
    update() {
        this.GL.clearColor(0, 0, 0, 0);
        this.GL.clearDepth(1.0);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT | this.GL.DEPTH_BUFFER_BIT);


        this.GL.enable(this.GL.DEPTH_TEST);
        this.GL.depthFunc(this.GL.LESS);      
        this.GL.enable(this.GL.BLEND);
        this.GL.enable(this.GL.CULL_FACE);
        this.GL.cullFace(this.GL.FRONT);

        let scene = SceneManager.getCurrentScene();
        
        if (scene == null)
            return;

        let viewports = scene.viewports;

        for (let vi = 0; vi < viewports.length; vi++) {
            let viewport = viewports[vi];

            let viewPortWidth = viewport._rendererBounds.p2.x;
            let viewPortHeight = viewport._rendererBounds.p2.y;

            this.GL.viewport(viewport._rendererBounds.p1.x, viewport._rendererBounds.p1.y, viewPortWidth, viewPortHeight);

            //setup camera from viewport

            let renderables = viewport.renderables;
            let renderableKeys = Object.keys(renderables);
            for (let ri = 0; ri < renderableKeys.length; ri++) {
                let renderable = renderables[renderableKeys[ri]];

                if (!renderable.enabled)
                    continue;

                this._updateProgram(renderable.program);
                this._updatePositionsBuffer(renderable.vertexBuffer, renderable.vertexPositions);
                this._bindVAO(this.vao, this.positionAttributeLocation);
                this._updatePositionsBuffer(renderable.textureBuffer, renderable.texturePositions);
                this._bindVAO(this.vao, this.texcoordAttributeLocation);


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

                this.GL.uniform4fv(this.colorLocation, renderable.color.color);
                //this.GL.uniform4fv(this.subTexcoordLocation, renderable._subSpriteData);
                this.GL.uniform1f(this.depthLocation, renderable.depth);
                this.GL.uniformMatrix3fv(this.matrixLocation, false, Matrix3.projection(viewPortWidth, viewPortHeight).multiply(renderable.getMatrix()).m);

                if (this.activeTextureID !== renderable.textureID) {
                    this.activeTextureID = renderable.textureID;
                    this.GL.uniform1i(this.textureLocation, renderable.textureID);
                    this.GL.activeTexture(this.GL.TEXTURE0 + renderable.textureID);
                    this.GL.bindTexture(this.GL.TEXTURE_2D, renderable.texture.tex);
                }

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