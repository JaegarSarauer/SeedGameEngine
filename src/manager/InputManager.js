import Manager from './Manager';

export class _InputManager extends Manager {
    constructor() {
        super();
    }

}

/**
 * Singleton reference to the Input Manager.
 */
const InputManager = new _InputManager(); 
export default InputManager;