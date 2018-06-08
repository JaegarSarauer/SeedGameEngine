import Manager from './Manager';

export default class ObjectManager extends Manager {
    constructor() {
        super(this, "ObjectManager");
        this.i = this;
        this.gameObjectIDCounter = 0;
    }

    registerUpdateable(gameObject) {
        gameObject.id = this.gameObjectIDCounter++;
        let deregisterCallback = () => {}
        return deregisterCallback;
    }
}