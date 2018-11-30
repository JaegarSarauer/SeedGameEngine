import Manager from './Manager';

export class _AudioManager extends Manager {
    constructor() {
        super();
        this.masterVolume = 1;
        this.audioCtx = null;

        this.sounds = {};
    }

    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }

    addSound(soundName, soundAssetPath) {
        return this._createSoundBufferFromAsset(soundAssetPath).then((soundInfo) => {
            this.sounds[soundName] = soundInfo;
            return this.sounds[soundName];
        });
    }

    _createSoundBufferFromAsset(assetPath) {
        let soundInfo = {
            buffer: null,
        };

        return new Promise((res, rej) => {
            let request = new XMLHttpRequest();
            request.open('GET', assetPath, true);
            request.responseType = 'arraybuffer';
            request.addEventListener('load', () => {
                this.audioCtx.decodeAudioData(request.response, (buffer) => {
                    soundInfo.buffer = buffer;
                    return res(soundInfo);
                }, (err) => {
                    console.error(err);
                });
            });
            request.send();
        });
    }

    playSound(soundName, volume = 1) {
        // Find the sound to play.
        let sound = this.sounds[soundName];
        if (sound == null)
            return false;
        
        if (!this.audioCtx.createGain) // For older browser support
            this.audioCtx.createGain = this.audioCtx.createGainNode;

        // Create the gain preference and set the volume
        let gainNode = this.audioCtx.createGain();
        gainNode.gain.value = volume * this.masterVolume;

        // Set the audio buffer source.
        let source = this.audioCtx.createBufferSource();
        source.buffer = sound.buffer;    

        // Connect gain node to buffer.
        source.connect(gainNode);      
        
        // Set default audio output.
        gainNode.connect(this.audioCtx.destination);      

        if (!source.start) // For older browser support
            source.start = source.noteOn;

        // Start the buffer playback.
        source.start(0);        
    }

    start() {
        try {
            // Fix up for prefixing
            window.AudioContext = window.AudioContext||window.webkitAudioContext;
            this.audioCtx = new AudioContext();
        }
        catch(e) {
            console.info('Web Audio API is not supported in this browser');
        }
    }

    removeSound(soundName) {
        delete this.sounds[soundName];
    }

    end() {
        let soundNames = {};
        //remove all loaded sounds
    }
}

/**
 * Singleton reference to the Audio Manager.
 */
const AudioManager = new _AudioManager();
export default AudioManager;