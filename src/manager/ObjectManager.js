import Manager from './Manager';

export class _ObjectManager extends Manager {
    constructor() {
        this.gameObjectIDCounter = 0;
    }

    registerUpdateable(gameObject) {
        gameObject.id = this.gameObjectIDCounter++;
        let deregisterCallback = () => {}
        return deregisterCallback;
    }
}

export default ObjectManager = new _ObjectManager();