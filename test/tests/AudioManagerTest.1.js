import log from '../helper/Log';
import Test from '../helper/Test';
import Loader from '../../src/utils/Loader';
import { AudioManager } from '../../src/entry';

/**
 * Example test. Runs a few simple assertions and chains them.
 * The third one fails on purpose.
 * @test 
 */
export default class AudioManagerTest extends Test {
    constructor() {
        super('Audio Manager Test', 4); 
        this.loader = null;
    }
    
    steps() {
        this.addStep('Add and Get Sound', () => {
            return AudioManager.addSound('slash1', './hit.wav').then((sound) => {
                return sound.buffer != null;
            });
            // getTexture(texID) {
            // addTexture(texName, textureImageAsset, frameWidth, frameHeight, glyphInfo = null) {
        });

        this.addStep('Create Sound Buffer from Asset', () => {
            return AudioManager._createSoundBufferFromAsset('./hit.wav').then((sInfo) =>{
                return sInfo.buffer != null;
            });
        });

        this.addStep('Play Sound', () => {
            AudioManager.playSound('slash1', 1);
            return true;
        });

        this.addStep('Remove Sound', () => {
            AudioManager.removeSound('slash1');
            return AudioManager.sounds.slash1 == null;
        });
    }
}