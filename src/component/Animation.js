import Component from './Component';

export default class Animation extends Component {
    constructor() {
        super(false);
        this.className = 'Animation';
        this.interpolationData = {};
        this.animationFrames = 0;
    }

    animationFramesLeft() {
        return this.animationFrames;
    }

    isAnimating(interpol = null) {
        if (interpol == null)
            return Object.keys(this.interpolationData).length > 0;
        return this.interpolationData[interpol] != null;
    }

    _buildInterpolation(key, frames, frameChange, finalFrame) {
        this.interpolationData[key] = {
            frameChange,
            finalFrame,
            framesLeft: frames,
        };
    }

    clearAnimation(key) {
        delete this.interpolationData[key];
    }

    clearAnimations() {
        this.interpolationData = [];
        this.animationFrames = 0;
    }

    interpolatePosition(posX = 0, posY = 0, posZ = 0, frames = 1, cycles = 1, reset = false) {
        let start = this.gameObject.transform.getPosition();
        this._buildInterpolation('position', frames, () => {
            this.gameObject.transform.translate(posX, posY, posZ);
        }, () => {
            this.gameObject.transform.setPosition(start.x + (reset ? 0 : posX * frames), start.y + (reset ? 0 : posY * frames), start.z + (reset ? 0 : posZ * frames));
            if (--cycles > 0)
                this.interpolatePosition(posX, posY, posZ, frames, cycles, reset);
        })
    }

    interpolateScale(scaleX = 0, scaleY = 0, scaleZ = 0, frames = 1, cycles = 1, reset = false) {
        let start = this.gameObject.transform.getScale();
        this._buildInterpolation('scale', frames, () => {
            this.gameObject.transform.scale(scaleX, scaleY, scaleZ);
        },() => {
            this.gameObject.transform.setScale(start.x + (reset ? 0 : scaleX * frames), start.y + (reset ? 0 : scaleY * frames), start.z + (reset ? 0 : scaleZ * frames));
            if (--cycles > 0)
                this.interpolateScale(scaleX, scaleY, scaleZ, frames, cycles, reset);
        });
    }

    interpolateRotation(rotate, frames = 1, cycles = 1, reset = false) {
        let start = this.gameObject.transform.getRotation();
        this._buildInterpolation('rotation', frames, () => {
            this.gameObject.transform.rotate(rotate);
        },() => {
            this.gameObject.transform.setRotation(start + (reset ? 0 : rotate * frames));
            if (--cycles > 0)
                this.interpolateRotation(rotate, frames, cycles, reset);
        });
    }

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