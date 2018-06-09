import Manager from './Manager';

export class _ObjectManager extends Manager {
    constructor() {
        super();
        this.gameObjectIDCounter = 0;
    }

    registerUpdateable(gameObject) {
        gameObject.id = this.gameObjectIDCounter++;
        let deregisterCallback = () => {}
        return deregisterCallback;
    }
}

const ObjectManager = new _ObjectManager();
export default ObjectManager;