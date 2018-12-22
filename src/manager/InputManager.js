import Manager from './Manager';
import DOMManager from './DOMManager';
import Messager from '../utils/Messager';
import KeyCode from '../const/KeyCode';
import { SceneManager, Point } from '../entry';

/**
 * A manager class intended to manage the javascript callback associated with the DOM.
 * The InputManager filters general DOM events such as key down, key up, left and right click.
 * The manager sorts events into referenceable lists for components to reference each game tick.
 * 
 * In result, the InputManager creates a bridge between the DOM and Engine. Components should use the 
 * `is` functions to determine if a specific character is down for that game tick. 
 * 
 * If you want to listen to all characters, for example a textbox input, use events instead. To listen to events, 
 * use InputManager.events to access the event. Events are defined in InputManager.EVENT. See Messager.js for more info
 * on listening to events.
 */
export class _InputManager extends Manager {
    /**
     * Constructor. Initializes Messager, event definitons, and 
     * key and mouse states.
     */
    constructor() {
        super();     
        this.events = new Messager();
        this.EVENT = {
            LEFT_PRESSED: 'mouseLeftPressed',
            LEFT_RELEASED: 'mouseLeftReleased',
            RIGHT_PRESSED: 'mouseRightPressed',
            RIGHT_RELEASED: 'mouseRightReleased',
            MOUSE_MOVE: 'mouseMove',
            KEY_DOWN: 'keyDown',
            KEY_UP: 'keyUp',
            KEY: 'keyDownRepeat',
        };
        this.KEY_DOWN = [];
        this.KEY_PRESSED = [];
        this.KEY_UP = [];
        this.LEFT_PRESSED = [];
        this.LEFT_RELEASED = [];
        this.RIGHT_PRESSED = [];
        this.RIGHT_RELEASED = [];

        const AllKeys = 256;
        for (let i = 0; i < AllKeys; i++) {
            this.KEY_DOWN[i] = false;
            this.KEY_PRESSED[i] = false;
            this.KEY_UP[i] = false;
        }
    }

    /**
     * Returns true if the key represented by this KeyCode is pressed down on 
     * this game tick. Does not repeat each game tick. Must be released to re-trigger.
     * The `isKeyPressed()` will also return true when this function does.
     * 
     * @param {KeyCode} KeyCode Keycode enum which represents a character by number.
     * 
     * @returns {boolean} Is this key down.
     */
    isKeyDown(KeyCode) {
        return this.KEY_DOWN[KeyCode];
    }

    /**
     * Returns true if the key represented by this KeyCode is held down on 
     * this game tick. Repeats each game tick it is held down.
     * 
     * @param {KeyCode} KeyCode Keycode enum which represents a character by number.
     * 
     * @returns {boolean} Is this key pressed (held down).
     */
    isKeyPressed(KeyCode) {
        return this.KEY_PRESSED[KeyCode];
    }

    /**
     * Returns true if the key represented by this KeyCode is released on 
     * this game tick.
     * 
     * @param {KeyCode} KeyCode Keycode enum which represents a character by number.
     * 
     * @returns {boolean} Is this key released.
     */
    isKeyUp(KeyCode) {
        return this.KEY_UP[KeyCode];
    }

    /**
     * Called by the EngineManager. Not intended to be referenced. 
     * Sets up event listeners on the DOM.
     */
    start() {
        DOMManager.canvas.addEventListener('mouseup', (ev) => {
            ev.preventDefault();
            let event = {
                x: ev.offsetX * DOMManager.canvasDPIWidth,
                y: ev.offsetY * DOMManager.canvasDPIHeight,
                fullX: ev.offsetX * DOMManager.canvasDPIWidth,
                fullY: ev.offsetY * DOMManager.canvasDPIHeight,
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
                        if (ev.button == 0) {
                            this.LEFT_RELEASED[i].push(relEvent);
                        } else if (ev.button == 2) {
                            this.RIGHT_RELEASED[i].push(relEvent);
                        }
                    }
                }
            }
            if (ev.button == 0) {
                this.events.set(this.EVENT.LEFT_RELEASED, event);
            } else if (ev.button == 2) {
                this.events.set(this.EVENT.RIGHT_RELEASED, event);
            }
        })
        DOMManager.canvas.addEventListener('mousedown', (ev) => {
            ev.preventDefault();
            let event = {
                x: ev.offsetX * DOMManager.canvasDPIWidth,
                y: ev.offsetY * DOMManager.canvasDPIHeight,
                fullX: ev.offsetX * DOMManager.canvasDPIWidth,
                fullY: ev.offsetY * DOMManager.canvasDPIHeight,
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
                        if (ev.button == 0) {
                            this.LEFT_PRESSED[i].push(relEvent);
                        } else if (ev.button == 2) {
                            this.RIGHT_PRESSED[i].push(relEvent);
                        }
                    }
                }
            }
            if (ev.button == 0) {
                this.events.set(this.EVENT.LEFT_PRESSED, event);
            } else if (ev.button == 2) {
                this.events.set(this.EVENT.RIGHT_PRESSED, event);
            }
        })

        DOMManager.canvas.addEventListener('mousemove', (ev) => {
            ev.preventDefault();
            let event = {
                x: ev.offsetX * DOMManager.canvasDPIWidth,
                y: ev.offsetY * DOMManager.canvasDPIHeight,
                fullX: ev.offsetX * DOMManager.canvasDPIWidth,
                fullY: ev.offsetY * DOMManager.canvasDPIHeight,
                shiftHeld: ev.shiftKey,
                ctrlHeld: ev.ctrlKey,
            };
            let curScene = SceneManager.getCurrentScene();
            if (curScene != null) {
                for (let i = 0; i < curScene.viewports.length; i++) {                        
                    if (curScene.viewports[i].getBounds().isInBounds(new Point(event.x, event.y))) {
                        event.x -= curScene.viewports[i].getBounds().p1.x;
                        event.y -= curScene.viewports[i].getBounds().p1.y;
                        event.viewport = i;
                        break;
                    }
                }
            }
            this.events.set(this.EVENT.MOUSE_MOVE, event);
        })

        //right click manager
        DOMManager.canvas.oncontextmenu = (ev) => {
            ev.preventDefault();
        };

        //Key down manager
        document.addEventListener('keydown', (event) => {
            event.preventDefault();
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
        document.addEventListener('keyup', (event) => {
            event.preventDefault();
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

    /**
     * Managed by the EngineManager. Do not call directly. Updates character and mouse
     * inputs.
     */
    update() {
        this.KEY_DOWN = [];
        this.KEY_UP = [];
        this.LEFT_PRESSED = [];
        this.LEFT_RELEASED = [];
        this.RIGHT_PRESSED = [];
        this.RIGHT_RELEASED = [];

        let scene = null;
        if ((scene = SceneManager.getCurrentScene()) == null)
            return;

        for (let i = 0; i < scene.viewports.length; i++) {
            this.LEFT_PRESSED.push([]);
            this.LEFT_RELEASED.push([]);
            this.RIGHT_PRESSED.push([]);
            this.RIGHT_RELEASED.push([]);
        }
    }
}

/**
 * Singleton reference to the Input Manager.
 */
const InputManager = new _InputManager(); 
export default InputManager;