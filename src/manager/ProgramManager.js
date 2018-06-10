import Manager from './Manager';
import DOMManager from './DOMManager';
import * as VertexShader from '../const/VertexShader';
import * as FragmentShader from '../const/FragmentShader';

export class _ProgramManager extends Manager {
    constructor() {
        super();
        this.programIDCounter = 0;
        this.programs = {};
    }

    start() {
        this.addProgram('Default', VertexShader.DEFAULT_V, FragmentShader.DEFAULT_F);
    }

    getProgram(programKey) {
        if (this.programs[programKey] == null)
            throw 'Program does not exist!';
        return this.programs[programKey];
    }

    addProgram(programName, vertexShaderSource, fragmentShaderSource) {
        this.programs[programName] = {
            id: this.programIDCounter++,
            program: this._createProgram(vertexShaderSource, fragmentShaderSource),
        };
    }

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

    _createProgram(vertexShaderSource, fragmentShaderSource) {
        // create GLSL shaders, upload the GLSL source, compile the shaders
        let vertexShader = this._createShader(DOMManager.GL.VERTEX_SHADER, vertexShaderSource);
        let fragmentShader = this._createShader(DOMManager.GL.FRAGMENT_SHADER, fragmentShaderSource);

        // Link the two shaders into a program
        return this._createShadersProgram(vertexShader, fragmentShader);
    }
}

const ProgramManager = new _ProgramManager();
export default ProgramManager;