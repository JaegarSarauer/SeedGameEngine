import {success, error, info} from '../helper/Log';
import Test from '../helper/Test';
import Storage from '../../src/utils/Storage';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class StorageTest extends Test {
    constructor() {
        super('Storage Test');
    }
    
    steps() {
        this.addStep('Storage Test', () => {
            console.info(Storage);
            return true;
        });
    }
}