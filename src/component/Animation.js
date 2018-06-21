import Component from './Component';

export default class Animation extends Component {
    constructor() {
        super(false);
        this.className = 'Animation';
        this.interpolationData = {};
    }

    isAnimating(interpol = null) {
        if (interpol == null)
            return Object.keys(this.interpolationData).length > 0;
        return this.interpolationData[interpol] != null;
    }

    interpolatePosition(posX = 0, posY = 0, posZ = 0, frames = 1) {
        this.interpolationData.position = {
            frameChange: () => {
                this.gameObject.transform.translate(posX, posY, posZ);
            },
            finalFrame: () => {
                let start = this.interpolationData.position.startPosition;
                this.gameObject.transform.setPosition(start.x + posX * frames, start.y + posY * frames, start.z + posZ * frames);
            },
            startPosition: this.gameObject.transform.getPosition(),
            framesLeft: frames,
        };
    }

    interpolateScale(scaleX = 0, scaleY = 0, scaleZ = 0, frames = 1) {
        this.interpolationData.scale = {
            frameChange: () => {
                this.gameObject.transform.scale(scaleX, scaleY, scaleZ);
            },
            finalFrame: () => {
                let start = this.interpolationData.scale.startScale;
                this.gameObject.transform.setScale(start.x + scaleX * frames, start.y + scaleY * frames, start.z + scaleZ * frames);
            },
            startScale: this.gameObject.transform.getScale(),
            framesLeft: frames,
        };
    }

    interpolateRotation(rotate, frames = 1) {
        this.interpolationData.rotation = {
            frameChange: () => {
                this.gameObject.transform.rotate(rotate);
            },
            finalFrame: () => {
                let start = this.interpolationData.rotation.startRotation;
                this.gameObject.transform.setRotation(start + rotate * frames);
            },
            startRotation: this.gameObject.transform.getRotation(),
            framesLeft: frames,
        };
    }

    onUpdate() {
        let interpols = Object.keys(this.interpolationData);
        for (let i = 0; i < interpols.length; i++) {
            let interpol = this.interpolationData[interpols];
            if (interpol.framesLeft > 1) {
                interpol.frameChange();
                interpol.framesLeft--;
            } else {
                interpol.finalFrame();
                delete this.interpolationData[interpols];
            }
        }
    }
}