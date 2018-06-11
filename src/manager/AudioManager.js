import Manager from './Manager';

export class _AudioManager extends Manager {
    constructor() {
        super();
    }

}

/**
 * Singleton reference to the Audio Manager.
 */
const AudioManager = new _AudioManager();
export default AudioManager;