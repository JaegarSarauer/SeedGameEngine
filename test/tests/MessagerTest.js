import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import Messager from '../../src/utils/Messager';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class MessagerTest extends Test {
    constructor() {
        super('Messager Test', 4); 

        this.messager = null;
    }
    
    steps() {
        this.messager = new Messager();
        let token = null;
        
        this.addStep('Watch for future data', () => {
            return new Promise((res, rej) => {
                token = this.messager.watch('dataKey3', (data) => {
                    return res(data == 'asd');
                }, false);
            });
        });

        this.addStep('Set data & get data', () => {
            this.messager.set('dataKey2', 44);
            this.messager.set('dataKey3', 'asd');
            return this.messager.get('dataKey2') == 44;
        });
        
        this.addStep('Watch for data, return data now', () => {
            return new Promise((res, rej) => {
                this.messager.watch('dataKey2', (data) => {
                    return res(data == 44);
                }, true);
            });
        });
        
        this.addStep('Deregister from messager', () => {
            token.stop();
            return this.messager['dataKey3'] == null || this.messager['dataKey3'][token.id] == null;
        });

    }
}