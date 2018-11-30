import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class LoaderTest extends Test {
    constructor() {
        super('Loader Test', 2); 
        this.loader = null;
    }
    
    steps() {
        
        this.addStep('Build and await Loader', () => {
            return new Promise((res, rej) => {
                this.loader = new Loader(() => {
                    return res(true);
                });
            });
        });

        this.addStep('Add promises (0ms and 1000ms wait) to loader & start.', () => {
            this.loader.load(new Promise((res, rej) => {
                return res(true);
            }))
            this.loader.load(new Promise((res, rej) => {
                setTimeout(() => {
                    return res(true);
                }, 1000);
            }))
            this.loader.start();
            return true;
        });
    }
}