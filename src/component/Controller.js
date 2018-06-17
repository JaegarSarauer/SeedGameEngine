import Component from './Component';
import KeyCode from '../const/KeyCode';
import InputManager from '../manager/InputManager';

/**
 * A Collider Component that checks bounds only on a plane.
 * 
 * This commponent has interface functions for calculating collisions
 * which have to be defined to work. See Subclasses.
 */
export default class Controller extends Component {
    constructor() {
        super(true);
        this.KeyDownCallbacks = {};
        this.KeyPressedCallbacks = {};
        this.KeyUpCallbacks = {};
    }

    assignOnKeyDown(KeyCode, callback) {
        this.KeyDownCallbacks[KeyCode] = callback;
    }

    assignOnKeyPressed(KeyCode, callback) {
        this.KeyPressedCallbacks[KeyCode] = callback;
    }

    assignOnKeyUp(KeyCode, callback) {
        this.KeyUpCallbacks[KeyCode] = callback;
    }

    triggerKeyCallbacks() {
        //down keys
        let downKeys = Object.keys(this.KeyDownCallbacks);
        for (let i = 0; i < downKeys.length; i++) {
            if (InputManager.isKeyDown(downKeys[i]))
                this.KeyDownCallbacks[downKeys[i]]();
        }

        //pressed keys
        let pressedKeys = Object.keys(this.KeyPressedCallbacks);
        for (let i = 0; i < pressedKeys.length; i++) {
            if (InputManager.isKeyPressed(pressedKeys[i]))
                this.KeyPressedCallbacks[pressedKeys[i]]();
        }

        //up keys
        let upKeys = Object.keys(this.KeyUpCallbacks);
        for (let i = 0; i < upKeys.length; i++) {
            if (InputManager.isKeyUp(upKeys[i]))
                this.KeyUpCallbacks[upKeys[i]]();
        }
    }

    onUpdate() {
        this.triggerKeyCallbacks();
    }
}