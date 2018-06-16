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
            return Storage.get('scores/points').val() === 100;
        });
        this.addStep('SetObject', () => {
            return Storage.set('scores/users/user1', {score: 60, tag: 'JOE'});
        });
        this.addStep('GetObject', () => {
            return Storage.get('scores/users/user1').val().tag === 'JOE';
        });
        this.addStep('SetGet10000', () => {
            for (let i = 0; i < 10000; i++) {
                Storage.set('multi/test/' + i, i);
            }

            for (let i = 0; i < 10000; i++) {
                if (Storage.get('multi/test/' + i) !== i)
                    return false;
            }
            return true;
        });
        this.addStep('WatchSet', () => {
            let succ = false;

            Storage.watchNow('multi/test2', (data) => {
                console.info(data)
                if (data == null)
                    return;
                succ = (data.watcher.val() === 'wow');
            });
            Storage.set('multi/test2/watcher', 'wow');
            return succ;
        })
        this.addStep('SetWatchSet', () => {
            let succ = false;

            Storage.set('multi/test3/watcher', 'crazy');
            Storage.watch('multi/test3', (data) => {
                if (data == null)
                    return;
                succ = (data.watcher.val() === 'wow');
            });
            Storage.set('multi/test3/watcher', 'wow');
            return succ;
        })
        this.addStep('MultiWatchSet', () => {
            let succ = true;

            Storage.watchNow('another', (data) => {
                if (data == null)
                    return;
                succ = succ && (data.quick.test[434].val() === 1000);
            });

            Storage.watchNow('another/quick', (data) => {
                if (data == null)
                    return;
                succ = succ && (data.test[434].val() === 1000);
            });

            Storage.watchNow('another/quick/test', (data) => {
                if (data == null)
                    return;
                succ = succ && (data[434].val() === 1000);
            });

            Storage.watchNow('another/quick/test/434', (data) => {
                if (data == null)
                    return;
                succ = succ && (data.val() === 1000);
            });
            Storage.set('another/quick/test/434', 1000);
            return succ;
        })
        this.addStep('WatchSetCloseSet', () => {
            let succ = true;

            let closeCallback = Storage.watchNow('closing/test1', (data) => {
                if (data == null)
                    return;
                succ = succ && data.val();
            });
            Storage.set('closing/test1', true);
            closeCallback();
            Storage.set('closing/test1', false);
            return succ;
        })
        this.addStep('WatchCloseClose', () => {
            let succ = false;
            let closeCallback = Storage.watchNow('closing/test1', (data) => {
                if (data == null)
                    return;
                succ = data.val();
            });
            Storage.set('closing/test1', true);
            closeCallback();
            closeCallback();
            return succ;
        })
        // this.addStep('WatchesCloseAllSetMultiple')
    }
}