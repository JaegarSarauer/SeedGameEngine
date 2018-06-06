import Manager from './Manager';

export class _RenderManager extends Manager {
    constructor() {

    }

    start() {
        //render setup code.
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].start();
        // }
    }

    update() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].update();
        // }
    }

    end() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].end();
        // }
    }

    pause() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].pause();
        // }
    }

    unpause() {
        // let objKeys = Object.keys(this.persistentObjects);
        // for (let i = 0; i < objKeys.length; i++) {
        //     this.persistentObjects[objKeys[i]].unpause();
        // }
    }
}

export default RenderManager = new _RenderManager();