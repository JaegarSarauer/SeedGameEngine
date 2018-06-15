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
        this.addStep('SetNumber', () => {
            return Storage.set('scores/points', 100);
        });
        this.addStep('GetNumber', () => {
            return Storage.get('scores/points') === 100;
        });
        this.addStep('SetObject', () => {
            return Storage.set('scores/users/user1', {score: 60, tag: 'JOE'});
        });
        this.addStep('GetObject', () => {
            return Storage.get('scores/users/user1').tag === 'JOE';
        });
        this.addStep('SetGet1000', () => {
            for (let i = 0; i < 1000; i++) {
                Storage.set('multi/test/' + i, i);
            }

            for (let i = 0; i < 1000; i++) {
                if (Storage.get('multi/test/' + i) !== i)
                    return false;
            }
            return true;
        });
        this.addStep('WatchSet', () => {
            let succ = false;

            Storage.watch('multi/test', (data) => {
                succ = (data === 'wow');
            });
            Storage.set('multi/test/watcher', 'wow');
            return succ;
        })
        this.addStep('SetWatchSet', () => {
            let succ = false;

            Storage.set('multi/test/watcher', 'crazy');
            Storage.watch('multi/test', (data) => {
                succ = (data === 'wow');
            });
            Storage.set('multi/test/watcher', 'wow');
            return succ;
        })
        // this.addStep('MultiWatchSet', () => {
        //     let succ = true;

        //     Storage.watch('another', (data) => {
        //         succ = succ && (data.quick.test[434] === 'wow');
        //     });

        //     Storage.watch('another/quick', (data) => {
        //         succ = succ && (data.test[434] === 'wow');
        //     });

        //     Storage.watch('another/quick/test', (data) => {
        //         succ = succ && (data[434] === 'wow');
        //     });

        //     Storage.watch('another/quick/test/434', (data) => {
        //         succ = succ && (data === 'wow');
        //     });
        //     Storage.set('another/quick/test/434', 1000);
        //     return succ;
        // })
        // this.addStep('InheritWatchSet')
        // this.addStep('InheritWatchSet')
        // this.addStep('WatchTrigger')
        // this.addStep('WatchSetTrigger')
        // this.addStep('WatchSetTrigger')
        // this.addStep('WatchSetCloseSet')
        // this.addStep('WatchCloseClose')
        // this.addStep('WatchesCloseAllSetMultiple')
    }
}