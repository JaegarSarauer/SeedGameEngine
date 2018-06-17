import Controller from './Controller';
import KeyCode from '../const/KeyCode';
import { InputManager, Point } from '../entry';

/**
 * A Collider Component that checks bounds only on a plane.
 * 
 * This commponent has interface functions for calculating collisions
 * which have to be defined to work. See Subclasses.
 */
export default class WASDController extends Controller {
    constructor() {
        super();
    }

    onStart() {
        this.assignOnKeyPressed(KeyCode.W, () => {
            this.gameObject.transform.translate(0, -1, 0);
        });
        this.assignOnKeyPressed(KeyCode.A, () => {
            this.gameObject.transform.translate(-1, 0, 0);
        });
        this.assignOnKeyPressed(KeyCode.S, () => {
            this.gameObject.transform.translate(0, 1, 0);
        });
        this.assignOnKeyPressed(KeyCode.D, () => {
            this.gameObject.transform.translate(1, 0, 0);
        });
    }

    onUpdate() {
        let updatePos = new Point();
        if (InputManager.isKeyPressed(KeyCode.W)) {
            updatePos.y += -1;
        }
        if (InputManager.isKeyPressed(KeyCode.A)) {
            updatePos.x += -1;
        }
        if (InputManager.isKeyPressed(KeyCode.S)) {
            updatePos.y += 1;
        }
        if (InputManager.isKeyPressed(KeyCode.D)) {
            updatePos.x += 1;
        }
        updatePos.normalize();
        updatePos.multiply(5);
        this.gameObject.transform.translate(updatePos.x, updatePos.y, updatePos.z);
    }

}