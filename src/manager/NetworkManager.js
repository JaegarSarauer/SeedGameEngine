import Manager from './Manager';

export class _NetworkManager extends Manager {
    constructor() {
        super();
    }

}

/**
 * Singleton reference to the Network Manager.
 */
const NetworkManager = new _NetworkManager();
export default NetworkManager;