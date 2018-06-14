import Manager from './Manager';
import DOMManager from './DOMManager';

export class _InputManager extends Manager {
    constructor() {
        super();            
        this.events = {
            LeftClick: new Subscriber({
                x: -1,
                y: -1,
                shiftHeld: false,
                ctrlHeld: false,
            }),
            RightClick: new Subscriber({
                x: -1,
                y: -1,
                shiftHeld: false,
                ctrlHeld: false,
            }),
            KeyDown: new Subscriber({
                key: '',
                keyCode: 0,
                shiftHeld: false,
                ctrlHeld: false,
                repeat: false,
            })
        };
    }

    onStart() {
        //left click manager
        DOMManager.canvas.addEventListener('click', (event) => {
            this.events.LeftClick.set({
                x: event.offsetX * Engine.CanvasManager.DPIWidth,
                y: event.offsetY * Engine.CanvasManager.DPIHeight,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
            });
        });

        //right click manager
        DOMManager.canvas.oncontextmenu = (event) => {
            event.preventDefault();
            this.events.RightClick.set({
                x: event.offsetX * Engine.CanvasManager.DPIWidth,
                y: event.offsetY * Engine.CanvasManager.DPIHeight,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
            });
        };

        //Key down manager
        DOMManager.canvas.addEventListener('keydown', (event) => {
            console.info(event);
            this.events.KeyDown.set({
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