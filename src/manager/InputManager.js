import Manager from './Manager';
import DOMManager from './DOMManager';
import Messager from '../utils/Messager';

export class _InputManager extends Manager {
    constructor() {
        super();     
        this.events = new Messager();
        this.EVENT = {
            MOUSE_LEFT: 'mouseLeftClicked',
            MOUSE_RIGHT: 'mouseRightClicked',
            KEY_DOWN: 'keyDown',
            KEY_UP: 'keyUp',
            KEY: 'keyDownRepeat',
        };
    }

    start() {
        //left click manager
        DOMManager.canvas.addEventListener('click', (event) => {
            this.events.set(this.EVENT.MOUSE_LEFT, {
                x: event.offsetX * DOMManager.canvasDPIWidth,
                y: event.offsetY * DOMManager.canvasDPIHeight,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
            });
        });

        //right click manager
        DOMManager.canvas.oncontextmenu = (event) => {
            event.preventDefault();
            this.events.set(this.EVENT.MOUSE_RIGHT, {
                x: event.offsetX * DOMManager.canvasDPIWidth,
                y: event.offsetY * DOMManager.canvasDPIHeight,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
            });
        };

        //Key down manager
        DOMManager.canvas.addEventListener('keydown', (event) => {
            if (!event.repeat) {
                this.events.set(this.EVENT.KEY_DOWN, {
                    key: event.key,
                    keyCode: event.keyCode,
                    shiftHeld: event.shiftKey,
                    ctrlHeld: event.ctrlKey,
                    repeat: event.repeat,
                });
            }
            this.events.set(this.EVENT.KEY, {
                key: event.key,
                keyCode: event.keyCode,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
                repeat: event.repeat,
            });
        });

        //Key up manager
        DOMManager.canvas.addEventListener('keyup', (event) => {
            this.events.set(this.EVENT.KEY_UP, {
                key: event.key,
                keyCode: event.keyCode,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
                repeat: event.repeat,
            });
        });
    }
}

/**
 * Singleton reference to the Input Manager.
 */
const InputManager = new _InputManager(); 
export default InputManager;