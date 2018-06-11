import Manager from './Manager';
import DOMManager from './DOMManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';

/**
 * Manages WebGL Programs so that they only need to be created once across the engine
 * allowing multiple objects to still share the same reference.
 * 
 * Elliminates the need for the programmer to compile shaders and create programs, and eases 
 * on-the-fly Shader compiling.
 */
export class _ProgramManager extends Manager {
    constructor() {
        super();
        this.programIDCounter = 0;
        this.programs = {};
    }

    /**
     * Creates default programs for easy reference later on.
     */
    start() {
        this.addProgram('Default', VertexShader.DEFAULT_V, FragmentShader.DEFAULT_F);
    }

    /**
     * Returns a Program JSON Object containing the program, name and id.
     * 
     * @param {string} programKey Name of the program.
     * 
     * @returns {Program Object} Returns a JSON object with Program data.
     */
    getProgram(programKey) {
        if (this.programs[programKey] == null)
            throw 'Program does not exist!';
        return this.programs[programKey];
    }

    /**
     * Creates a Program JSON Object and initializes the program and metadata.
     * The program is added to the programs array.
     * 
     * @param {string} programName Name of the program.
     * @param {string} vertexShaderSource Source code of the vertex shader.
     * @param {string} fragmentShaderSource Source code of the fragment shader.
     */
    addProgram(programName, vertexShaderSource, fragmentShaderSource) {
        this.programs[programName] = {
            name: programName,
            id: this.programIDCounter++,
            program: this._createProgram(vertexShaderSource, fragmentShaderSource),
        };
    }

    /**
     * Creates a WebGL program from a compiled vertex and fragment shader. The program is returned.
     * 
     * @param {CompiledVertexShader} vertexShader A compiled vertex shader.
     * @param {CompiledFragmentShader} fragmentShader A compiled fragment shader.
     * 
     * @returns {Program} A WebGL program. Null if unsuccessful.
     */
    _createShadersProgram(vertexShader, fragmentShader) {
        let program = DOMManager.GL.createProgram();
        DOMManager.GL.attachShader(program, vertexShader);
        DOMManager.GL.attachShader(program, fragmentShader);
        DOMManager.GL.linkProgram(program);
        let success = DOMManager.GL.getProgramParameter(program, DOMManager.GL.LINK_STATUS);
        if (success) {
            return program;
        }

        console.error(DOMManager.GL.getProgramInfoLog(program));
        DOMManager.GL.deleteProgram(program);
        return null;
    }

    /**
     * Creates a shader of either Vertex or Fragment type and returns the compiled version.
     * 
     * @param {GLShaderType} type A GL shader type of either VERTEX_SHADER or FRAGMENT_SHADER.
     * @param {string} source Source code for the shader type.
     * 
     * @returns {CompiledShader} A compiled shader. Null if unsuccessful.
     */
    _createShader(type, source) {
        let shader = DOMManager.GL.createShader(type);
        DOMManager.GL.shaderSource(shader, source);
        DOMManager.GL.compileShader(shader);
        let success = DOMManager.GL.getShaderParameter(shader, DOMManager.GL.COMPILE_STATUS);
        if (success) {
            return shader;
        }

        console.error(DOMManager.GL.getShaderInfoLog(shader));
        DOMManager.GL.deleteShader(shader);
        return null;
    }

    /**
     * Compiles the vertex shader and fragment shader and returns a WebGL program.
     * 
     * @param {string} vertexShaderSource Source code for a vertex shader.
     * @param {string} fragmentShaderSource Source code for a fragment shader.
     * 
     * @returns {Program} A program compiled from the two shader sources.
     */
    _createProgram(vertexShaderSource, fragmentShaderSource) {
        let vertexShader = this._createShader(DOMManager.GL.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = this._createShader(DOMManager.GL.FRAGMENT_SHADER, fragmentShaderSource);

        return this._createShadersProgram(vertexShader, fragmentShader);
    }
}

/**
 * Singleton reference to the WebGL Program Manager.
 */
const ProgramManager = new _ProgramManager();
export default ProgramManager;