import Manager from './Manager';

export class _PhysicsManager extends Manager {
    constructor() {
        super();
    }

}

/**
 * Singleton reference to the Physics Manager.
 */
const PhysicsManager = new _PhysicsManager();
export default PhysicsManager;