import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import ProgramManager from '../../src/manager/ProgramManager';
import * as VertexShader from '../../src/const/VertexShader';
import * as FragmentShader from '../../src/const/FragmentShader';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class ProgramManagerTest extends Test {
    constructor() {
        super('Program Manager Test', 4); 
        this.loader = null;
    }
    
    steps() {
        this.addStep('Add and Get Program', () => {        
            ProgramManager.addProgram('Default2', VertexShader.DEFAULT_V, FragmentShader.DEFAULT_F, {
                'u_color': 'uniform4fv',
                'u_matrix': 'uniformMatrix3fv',
                'u_depth': 'uniform1f',
                'u_texture': 'uniform1i',
                'u_subTexcoord': 'uniform4fv',
            });
            let program = ProgramManager.getProgram('Default2');
            return program.name == 'Default2';
        });


        let coreProgram = null;
        this.addStep('Create New Program.', () => {
            coreProgram = ProgramManager._createProgram(VertexShader.DEFAULT_V, FragmentShader.DEFAULT_F);
            return coreProgram != null;
        });

        this.addStep('Create Program Uniform Mapping', () => {
            let uniformSetters = ProgramManager._createProgramLocationSetters(coreProgram, {
                'u_color': 'uniform4fv',
                'u_matrix': 'uniformMatrix3fv',
                'u_depth': 'uniform1f',
                'u_texture': 'uniform1i',
                'u_subTexcoord': 'uniform4fv',
            });
            return uniformSetters['u_color'] != null;
        });

        this.addStep('Remove Program.', () => {
            ProgramManager.programs['Default2'] = null;
            try {
                let program = ProgramManager.getProgram('Default2');
            } catch (e) {
                return true;
            }
            return false;
        });
    }
}