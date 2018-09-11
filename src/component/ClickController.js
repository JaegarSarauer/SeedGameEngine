import Controller from './Controller';
import KeyCode from '../const/KeyCode';
import InputManager from '../manager/InputManager';

/**
 * 
 */
export default class ClickController extends Controller {
    constructor(viewportID, onLeftReleased = (event) => {}, onRightReleased = (event) => {}, onLeftPressed = (event) => {}, onRightPressed = (event) => {}, onLeftReleaseOutside = (event) => {}, onRightReleaseOutside = (event) => {}) {
        super();
        this.className = 'ClickController';
        this.viewportID = viewportID;
        this.onLeftReleased = onLeftReleased;
        this.onRightReleased = onRightReleased;
        this.onLeftPressed = onLeftPressed;
        this.onRightPressed = onRightPressed;
        this.onLeftReleaseOutside = onLeftReleaseOutside;
        this.onRightReleaseOutside = onRightReleaseOutside;

        /**
         * Was the left button pressed on this click area?
         */
        this.leftPressed = false;

        /**
         * Was the right button pressed on this click area?
         */
        this.rightPressed = false;
    }

    onUpdate() {
        let pos = this.gameObject.transform.getPosition();
        let offset = this.gameObject.transform.getOriginOffset();
        let sca = this.gameObject.transform.getScale();
        pos.subtract(sca.x * offset.x, sca.y * offset.y);
        for (let i = 0; i < InputManager.LEFT_RELEASED[this.viewportID].length; i++) {
            let ev = InputManager.LEFT_RELEASED[this.viewportID][i];
            if (pos.x <= ev.x && pos.x + sca.x >= ev.x && pos.y <= ev.y && pos.y + sca.y >= ev.y) {
                this.onLeftReleased(ev);
            } else {
                this.leftPressed = false;
                this.onLeftReleaseOutside(ev);
            }
        }
        for (let i = 0; i < InputManager.RIGHT_RELEASED[this.viewportID].length; i++) {
            let ev = InputManager.RIGHT_RELEASED[this.viewportID][i];
            if (pos.x <= ev.x && pos.x + sca.x >= ev.x && pos.y <= ev.y && pos.y + sca.y >= ev.y) {
                this.onRightReleased(ev);
            } else {
                this.rightPressed = false;
                this.onRightReleaseOutside(ev);
            }
        }
        for (let i = 0; i < InputManager.LEFT_PRESSED[this.viewportID].length; i++) {
            let ev = InputManager.LEFT_PRESSED[this.viewportID][i];
            if (pos.x <= ev.x && pos.x + sca.x >= ev.x && pos.y <= ev.y && pos.y + sca.y >= ev.y) {
                this.onLeftPressed(ev);
                this.leftPressed = true;
            }
        }
        for (let i = 0; i < InputManager.RIGHT_PRESSED[this.viewportID].length; i++) {
            let ev = InputManager.RIGHT_PRESSED[this.viewportID][i];
            if (pos.x <= ev.x && pos.x + sca.x >= ev.x && pos.y <= ev.y && pos.y + sca.y >= ev.y) {
                this.onRightPressed(ev);
                this.rightPressed = true;
            }
        }
    }
}