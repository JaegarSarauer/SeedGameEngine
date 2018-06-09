import Manager from './Manager';
import DOMManager from './DOMManager';
import SceneManager from './SceneManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';

export class _RenderManager extends Manager {
    constructor() {
        super();
        this.GL = null;
    }

    start() {
        this.GL = DOMManager.GL;

        let program = this.createProgram(VertexShader.DEFAULT_V, FragmentShader.DEFAULT_F);

        this.createBuffer();
        
        // look up where the vertex data needs to go.
        let positionAttributeLocation = this.GL.getAttribLocation(program, "a_position");

        // Create a vertex array object (attribute state)
        let vao = this.GL.createVertexArray();

        // and make it the one we're currently working with
        this.GL.bindVertexArray(vao);

        // Turn on the attribute
        this.GL.enableVertexAttribArray(positionAttributeLocation);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        let size = 2;          // 2 components per iteration
        let type = this.GL.FLOAT;   // the data is 32bit floats
        let normalize = false; // don't normalize the data
        let stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        let vertexOffset = 0;        // start at the beginning of the buffer
        this.GL.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, vertexOffset);

        // Tell WebGL how to convert from clip space to pixels
        this.GL.viewport(0, 0, this.GL.canvas.width, this.GL.canvas.height);

        // Clear the canvas
        this.GL.clearColor(.9, .9, .9, 1);
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        this.GL.useProgram(program);

        // Bind the attribute/buffer set we want.
        this.GL.bindVertexArray(vao);

        // draw
        let primitiveType = this.GL.TRIANGLES;
        let offset = 0;
        let count = 3;
        this.GL.drawArrays(primitiveType, 0, count);
    }

    update() {
        return;
        

        gl.clearColor(0, 0, 0, 0);
    
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        

        let viewports = SceneManager.getCurrentScene().viewports;
        let viewportKeys = Object.keys(viewports);

        for (let vi = 0; vi < viewportKeys.length; vi++) {
            let viewport = viewports[viewportKeys[vi]];

            gl.viewport(viewport.bounds.p1.x, viewport.bounds.p1.y, viewport.bounds.p2.x, viewport.bounds.p2.y);

            //setup camera from viewport

            let renderables = viewport.renderables;
            let renderableKeys = Object.keys(renderables);
            for (let ri = 0; ri < renderableKeys.length; ri++) {
                let renderable = renderables[renderableKeys[ri]];

                gl.useProgram(renderable.program);

                let vao = gl.createVertexArray();
                gl.createVertexArray(vao);

                let positionAttributeLocation = this.GL.getAttribLocation(program, "a_position");
                let matrixLocation = gl.getUniformLocation(program, "u_matrix");
                var colorLocation = gl.getUniformLocation(program, "u_color");

                gl.uniform4fv(colorLocation, color);
                
                gl.uniformMatrix3fv(renderable.matrix, false, matrix);

                gl.drawArrays(primitiveType, offset, count);

                var primitiveType = gl.TRIANGLES;
                gl.drawArrays(renderable.primitiveType, 0, renderable.primitiveCount);
            }
        }
    
        // Set the color.
    
        // Draw the geometry.
    }

    end() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].end();
        // }
    }

    pause() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].pause();
        // }
    }

    unpause() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].unpause();
        // }
    }

    createShadersProgram(vertexShader, fragmentShader) {
        let program = this.GL.createProgram();
        this.GL.attachShader(program, vertexShader);
        this.GL.attachShader(program, fragmentShader);
        this.GL.linkProgram(program);
        let success = this.GL.getProgramParameter(program, this.GL.LINK_STATUS);
        if (success) {
            return program;
        }

        console.error(this.GL.getProgramInfoLog(program));
        this.GL.deleteProgram(program);
        return null;
    }

    createShader(type, source) {
        let shader = this.GL.createShader(type);
        this.GL.shaderSource(shader, source);
        this.GL.compileShader(shader);
        let success = this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.error(this.GL.getShaderInfoLog(shader));
        this.GL.deleteShader(shader);
        return null;
    }

    createProgram(vertexShaderSource, fragmentShaderSource) {
        // create GLSL shaders, upload the GLSL source, compile the shaders
        let vertexShader = this.createShader(this.GL.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = this.createShader(this.GL.FRAGMENT_SHADER, fragmentShaderSource);

        // Link the two shaders into a program
        return this.createShadersProgram(vertexShader, fragmentShader);
    }

    createBuffer() {

        // Create a buffer and put three 2d clip space points in it
        let positionBuffer = this.GL.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        this.GL.bindBuffer(this.GL.ARRAY_BUFFER, positionBuffer);

        let positions = [
            0, 0,
            0, 0.5,
            0.7, 0,
        ];

        this.GL.bufferData(this.GL.ARRAY_BUFFER, new Float32Array(positions), this.GL.STATIC_DRAW);

    }
}
const RenderManager = new _RenderManager();
export default RenderManager;