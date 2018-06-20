import Controller from './Controller';
import KeyCode from '../const/KeyCode';
import InputManager from '../manager/InputManager';

/**
 * 
 */
export default class ClickController extends Controller {
    constructor(onLeft = (event) => {}, onRight = (event) => {}) {
        super();
        this.onLeftClick = onLeft;
        this.onRightClick = onRight;
    }

    onUpdate() {
        let pos = this.gameObject.transform.getPosition();
        let offset = this.gameObject.transform.getOriginOffset();
        let sca = this.gameObject.transform.getScale();
        pos.subtract(sca.x * offset.x, sca.y * offset.y);
        for (let i = 0; i < InputManager.LEFT_CLICK.length; i++) {
            let ev = InputManager.LEFT_CLICK[i];
            if (pos.x <= ev.x && pos.x + sca.x >= ev.x && pos.y <= ev.y && pos.y + sca.y >= ev.y) {
                this.onLeftClick(ev);
            }
        }
        for (let i = 0; i < InputManager.RIGHT_CLICK.length; i++) {
            let ev = InputManager.RIGHT_CLICK[i];
            if (pos.x <= ev.x && pos.x + sca.x >= ev.x && pos.y <= ev.y && pos.y + sca.y >= ev.y) {
                this.onRightClick(ev);
            }
        }
    }
}