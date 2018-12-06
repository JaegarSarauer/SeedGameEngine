import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { InputManager } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class InputPatternTest extends Test {
    constructor() {
        super('Input Pattern Test', 8); 
        this.loader = null;
        this.clearList = [];
    }
    
    steps() {
        this.addStep('Mouse Left Pressed', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.LEFT_PRESSED, (ev) => {
                    return res(true);
                }));
            });
        });
        this.addStep('Mouse Left Released', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.LEFT_RELEASED, (ev) => {
                    return res(true);
                }));
            });
        });
        this.addStep('Mouse Right Pressed', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.RIGHT_PRESSED, (ev) => {
                    return res(true);
                }));
            });
        });
        this.addStep('Mouse Right Released', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.RIGHT_RELEASED, (ev) => {
                    return res(true);
                }));
            });
        });
        this.addStep('Mouse Moved', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.MOUSE_MOVE, (ev) => {
                    return res(true);
                }));
            });
        });

        console.info('Waiting for mouse input.');

        this.addStep('Keyboard Key Pressed', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.KEY_DOWN, (ev) => {
                    return res(true);
                }));
            });
        });
        this.addStep('Keyboard Key', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.KEY, (ev) => {
                    return res(true);
                }));
            });
        });
        this.addStep('Keyboard Key Released', () => {
            return new Promise((res, rej) => {
                this.clearList.push(InputManager.events.watch(InputManager.EVENT.KEY_UP, (ev) => {
                    return res(true);
                }));
            });
        });

        console.info('Waiting for keyboard input.');
    }

    cleanup() {
        for (let i = 0; i < this.clearList.length; i++) 
            this.clearList[i].callback();
    }
}