import Manager from './Manager';
import DOMManager from './DOMManager';
import Messager from '../utils/Messager';
import KeyCode from '../const/KeyCode';
import { SceneManager, Point } from '../entry';

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
        this.KEY_DOWN = [];
        this.KEY_PRESSED = [];
        this.KEY_UP = [];
        this.LEFT_CLICK = [];
        this.RIGHT_CLICK = [];

        const AllKeys = 256;
        for (let i = 0; i < AllKeys; i++) {
            this.KEY_DOWN[i] = false;
            this.KEY_PRESSED[i] = false;
            this.KEY_UP[i] = false;
        }
    }

    isKeyDown(KeyCode) {
        return this.KEY_DOWN[KeyCode];
    }

    isKeyPressed(KeyCode) {
        return this.KEY_PRESSED[KeyCode];
    }

    isKeyUp(KeyCode) {
        return this.KEY_UP[KeyCode];
    }

    start() {
        //left click manager
        DOMManager.canvas.addEventListener('click', (ev) => {
            let event = {
                x: ev.offsetX * DOMManager.canvasDPIWidth,
                y: ev.offsetY * DOMManager.canvasDPIHeight,
                shiftHeld: ev.shiftKey,
                ctrlHeld: ev.ctrlKey,
            };
            let curScene = SceneManager.getCurrentScene();
            if (curScene != null) {
                for (let i = 0; i < curScene.viewports.length; i++) {
                    
                    console.info(curScene.viewports[i], curScene.viewports[i].getBounds(), event, new Point(event.x, event.y), 
                    curScene.viewports[i].getBounds().isInBounds(new Point(event.x, event.y)))
                        
                    if (curScene.viewports[i].getBounds().isInBounds(new Point(event.x, event.y))) {
                        let relEvent = Object.assign({}, event);
                        relEvent.x -= curScene.viewports[i].getBounds().p1.x;
                        relEvent.y -= curScene.viewports[i].getBounds().p1.y;
                        this.LEFT_CLICK[i].push(relEvent);
                    }
                }
            }
            this.events.set(this.EVENT.MOUSE_LEFT, event);
        });

        //right click manager
        DOMManager.canvas.oncontextmenu = (ev) => {
            ev.preventDefault();
            let event = {
                x: ev.offsetX * DOMManager.canvasDPIWidth,
                y: ev.offsetY * DOMManager.canvasDPIHeight,
                shiftHeld: ev.shiftKey,
                ctrlHeld: ev.ctrlKey,
            };
            let curScene = SceneManager.getCurrentScene();
            if (curScene != null) {
                for (let i = 0; i < curScene.viewports.length; i++) {
                    if (curScene.viewports[i].getBounds().isInBounds(new Point(event.x, event.y))) {
                        let relEvent = Object.assign({}, event);
                        relEvent.x -= curScene.viewports[i].getBounds().p1.x;
                        relEvent.y -= curScene.viewports[i].getBounds().p1.y;
                        this.RIGHT_CLICK[i].push(relEvent);
                    }
                }
            }
            this.events.set(this.EVENT.MOUSE_RIGHT, event);
        };

        //Key down manager
        DOMManager.canvas.addEventListener('keydown', (event) => {
            let code = event.which || event.keyCode;
            this.KEY_PRESSED[code] = true;
            if (!event.repeat) {
                this.KEY_DOWN[code] = true;
                this.events.set(this.EVENT.KEY_DOWN, {
                    key: event.key,
                    code,
                    shiftHeld: event.shiftKey,
                    ctrlHeld: event.ctrlKey,
                    repeat: event.repeat,
                });
            }
            this.events.set(this.EVENT.KEY, {
                key: event.key,
                code,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
                repeat: event.repeat,
            });
        });

        //Key up manager
        DOMManager.canvas.addEventListener('keyup', (event) => {
            let code = event.which || event.keyCode;
            this.KEY_DOWN[code] = false;
            this.KEY_PRESSED[code] = false;
            this.KEY_UP[code] = true;
            this.events.set(this.EVENT.KEY_UP, {
                key: event.key,
                code,
                shiftHeld: event.shiftKey,
                ctrlHeld: event.ctrlKey,
                repeat: event.repeat,
            });
        });
    }

    update() {
        this.KEY_DOWN = [];
        this.KEY_UP = [];
        this.LEFT_CLICK = [];
        this.RIGHT_CLICK = [];

        let scene = null;
        if ((scene = SceneManager.getCurrentScene()) == null)
            return;

        for (let i = 0; i < scene.viewports.length; i++) {
            this.LEFT_CLICK.push([]);
            this.RIGHT_CLICK.push([]);
        }
    }
}

/**
 * Singleton reference to the Input Manager.
 */
const InputManager = new _InputManager(); 
export default InputManager;