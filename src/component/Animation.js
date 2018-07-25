import Component from './Component';

/**
 * Animation component to be added to a GameObject to create animations inline with
 * the global game loop. Animation Components currently only offer transform interpolation
 * frames. Using buildInterpolation can be used to make custom animations which last n frames.
 */
export default class Animation extends Component {

    /**
     * Constructor for the animation component. A GameObject may have more than one Animation component.
     */
    constructor() {
        super(false);
        this.className = 'Animation';
        this.interpolationData = {};
        this.animationFrames = 0;
    }

    /**
     * Returns the frames left until all animations are complete.
     */
    animationFramesLeft() {
        return this.animationFrames;
    }

    /**
     * Checks to see if an animation, defined by the interpol animation key, 
     * still has frames left to complete the animation.
     * 
     * @param {string} interpol Animation interpolation key.
     */
    isAnimating(interpol = null) {
        if (interpol == null)
            return Object.keys(this.interpolationData).length > 0;
        return this.interpolationData[interpol] != null;
    }

    /**
     * Adds an animation to the Animation component. The animation component will keep track
     * and trigger the animation frames once per game tick until there are no more frames left.
     * On the final frame, the finalFrame callback will be called instead.
     * 
     * @param {string} key Animation interpolation key.
     * @param {number} frames How many game ticks will this animation run.
     * @param {function} frameChange Callback function executed once per animation frame.
     * @param {function} finalFrame Callback function execured as the last frame. Defaults to frameChange.
     */
    buildInterpolation(key, frames, frameChange, finalFrame = frameChange) {
        this.interpolationData[key] = {
            frameChange,
            finalFrame,
            framesLeft: frames,
        };
    }

    /**
     * Clears an animation from executing any more frames. The animation to remove is defined
     * by the key parameter.
     * 
     * @param {string} key Animation interpolation key.
     */
    clearAnimation(key) {
        delete this.interpolationData[key];
    }

    /**
     * Clear all animations on this Animation component.
     */
    clearAnimations() {
        this.interpolationData = [];
        this.animationFrames = 0;
    }

    /**
     * Wrapper function for creating animations of moving from one point to another (translating).
     * 
     * @param {number} posX X position move per frame.
     * @param {number} posY Y position move per frame.
     * @param {number} posZ Z position move per frame.
     * @param {number} frames Amount of frames in this animation.
     * @param {number} cycles Amount of times to repeat this animation.
     * @param {boolean} reset Reset the position on animation finish.
     */
    interpolatePosition(posX = 0, posY = 0, posZ = 0, frames = 1, cycles = 1, reset = false) {
        let start = this.gameObject.transform.getPosition();
        this.buildInterpolation('position', frames, () => {
            this.gameObject.transform.translate(posX, posY, posZ);
        }, () => {
            this.gameObject.transform.setPosition(start.x + (reset ? 0 : posX * frames), start.y + (reset ? 0 : posY * frames), start.z + (reset ? 0 : posZ * frames));
            if (--cycles > 0)
                this.interpolatePosition(posX, posY, posZ, frames, cycles, reset);
        })
    }

    /**
     * Wrapper function for creating animations to change the scale of the GameObject.
     * 
     * @param {number} posX X scale change per frame.
     * @param {number} posY Y scale change per frame.
     * @param {number} posZ Z scale change per frame.
     * @param {number} frames Amount of frames in this animation.
     * @param {number} cycles Amount of times to repeat this animation.
     * @param {boolean} reset Reset the position on animation finish.
     */
    interpolateScale(scaleX = 0, scaleY = 0, scaleZ = 0, frames = 1, cycles = 1, reset = false) {
        let start = this.gameObject.transform.getScale();
        this.buildInterpolation('scale', frames, () => {
            this.gameObject.transform.scale(scaleX, scaleY, scaleZ);
        },() => {
            this.gameObject.transform.setScale(start.x + (reset ? 0 : scaleX * frames), start.y + (reset ? 0 : scaleY * frames), start.z + (reset ? 0 : scaleZ * frames));
            if (--cycles > 0)
                this.interpolateScale(scaleX, scaleY, scaleZ, frames, cycles, reset);
        });
    }

    /**
     * Wrapper function for creating animations to rotate the GameObject.
     * 
     * @param {number} posX X scale change per frame.
     * @param {number} posY Y scale change per frame.
     * @param {number} posZ Z scale change per frame.
     * @param {number} frames Amount of frames in this animation.
     * @param {number} cycles Amount of times to repeat this animation.
     * @param {boolean} reset Reset the position on animation finish.
     */
    interpolateRotation(rotate, frames = 1, cycles = 1, reset = false) {
        let start = this.gameObject.transform.getRotation();
        this.buildInterpolation('rotation', frames, () => {
            this.gameObject.transform.rotate(rotate);
        },() => {
            this.gameObject.transform.setRotation(start + (reset ? 0 : rotate * frames));
            if (--cycles > 0)
                this.interpolateRotation(rotate, frames, cycles, reset);
        });
    }

    /**
     * onUpdate is called automatically as a Component. Executes a frame for each animation.
     */
    onUpdate() {
        this.animationFrames--;
        let interpols = Object.keys(this.interpolationData);
        for (let i = 0; i < interpols.length; i++) {
            let interpol = this.interpolationData[interpols];
            this.animationFrames = Math.max(this.animationFrames, interpol.framesLeft - 1);
            if (interpol.framesLeft > 1) {
                interpol.frameChange();
                interpol.framesLeft--;
            } else if (interpol.framesLeft > 0) {
                interpol.finalFrame();
                interpol.framesLeft--;
            } else if (interpol.framesLeft <= 0) {
                delete this.interpolationData[interpols];
            }
        }
    }
}