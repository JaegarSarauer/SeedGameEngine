import Controller from './Controller';
import KeyCode from '../const/KeyCode';
import { InputManager, Point } from '../entry';

/**
 * A Controller Component with extra methods designed for controlling a 
 * character in a Top-Down Perspective view.
 */
export default class TopDownController extends Controller {
    constructor() {
        super();
    }

    /**
     * Returns true if this game update notices a key press for 'W' or Up key.
     */
    isUpPressed() {
        return InputManager.isKeyPressed(KeyCode.W) || InputManager.isKeyPressed(KeyCode.UP);
    }

    /**
     * Returns true if this game update notices a key press for 'S' or Down key.
     */
    isDownPressed() {
        return InputManager.isKeyPressed(KeyCode.S) || InputManager.isKeyPressed(KeyCode.DOWN);
    }

    /**
     * Returns true if this game update notices a key press for 'A' or Left key.
     */
    isLeftPressed() {
        return InputManager.isKeyPressed(KeyCode.A) || InputManager.isKeyPressed(KeyCode.LEFT);
    }

    /**
     * Returns true if this game update notices a key press for 'D' or Right key.
     */
    isRightPressed() {
        return InputManager.isKeyPressed(KeyCode.D) || InputManager.isKeyPressed(KeyCode.RIGHT);
    }

}