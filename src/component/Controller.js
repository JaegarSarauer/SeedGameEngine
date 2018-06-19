import Component from './Component';
import KeyCode from '../const/KeyCode';
import InputManager from '../manager/InputManager';

/**
 * A Baseclass for controller components. It is advised to use
 * controllers to contain movement logic. There are basic movement and 
 * onClick controllers. You may make your own, remember to derive this class.
 */
export default class Controller extends Component {
    constructor() {
        super(false);
    }
}