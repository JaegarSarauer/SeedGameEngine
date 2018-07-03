import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';

/**
 * Renderable2D is a renderable component which focusses on
 * 2D shaders and matricies for 2D space rendering.
 */
export default class Renderable2DGrid extends Renderable {
    constructor(gridWidth, gridHeight) {
        super();
        this.className = 'Renderable2DGrid';
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.setVertexPositions();
    }

    setVertexPositions() {
        let vertexPosArray = [];
        for (let h = 0; h < this.gridHeight; h++) {
            for (let w = 0; w < this.gridWidth; w++) {
                vertexPosArray.concat(0 + w, 0 + h, 1 + w, 0 + h, 0 + w, 1 + h, 0 + w, 1 + h, 1 + w, 0 + h, 1 + w, 1 + h);
            }
        }
        this.primitiveCount = this.gridHeight * this.gridWidth * 6;
        this.vertexPositions = new Float32Array(vertexPosArray);
    }

    setSubIndex(subIndexArray) {

        let textureMap = [];

        if (this.texture == null || !Array.isArray(subIndexArray))
            return;

        let framesWidth = this.texture.frameWidth / this.texture.width;
        let framesHeight = this.texture.frameHeight / this.texture.height;

        for (let h = 0; h < this.gridHeight; h++) {
            for (let w = 0; w < this.gridWidth; w++) {
                let i = (h * this.gridWidth) + w;

                let frW = subIndexArray[i] % (1 / framesWidth);
                let frH = Math.floor(subIndexArray[i] * framesWidth);

                textureMap.concat(0 + frW, 0 + frH, 1 + frW, 0 + frH, 0 + frW, 1 + frH, 0 + frW, 1 + frH, 1 + frW, 0 + frH, 1 + frW, 1 + frH);
            }
        }

        this.texturePositions = new Float32Array(textureMap);
    }
}