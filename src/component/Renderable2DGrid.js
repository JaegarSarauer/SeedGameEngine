import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';
import TextureManager from '../manager/TextureManager';
import RenderManager from '../manager/RenderManager';
import Renderable2DMultitex from './Renderable2DMultitex';

/**
 * Renderable2D is a renderable component which focusses on
 * 2D shaders and matricies for 2D space rendering.
 */
export default class Renderable2DGrid extends Renderable2DMultitex {
    constructor(mapTilesTexture, gridData, width, height, tileViewWidth, tileViewHeight) {
        super(ProgramManager.getProgram('2DGrid'));
        this.className = 'Renderable2DGrid';
        this.dataArray = null;
        this.shaderTileData = [];
        this.addTexture(mapTilesTexture);
        this.setGridData(gridData, width, height, tileViewWidth, tileViewHeight);
    }

    setGridData(data, width, height, tileViewWidth, tileViewHeight) {
        this.dataArray = new Uint16Array(data);
        let texture = TextureManager.addDataTexture('MapData', this.dataArray, RenderManager.GL.R16UI, RenderManager.GL.RED_INTEGER, RenderManager.GL.UNSIGNED_SHORT, -1, -1, width, height);
        this.addTexture(texture);
        /*
        [0][0] = 0 = Map data tiles width.
        [0][1] = 1 = Map data tiles height.
        [0][2] = 2 = Map tiles in the texture width.
        [0][3] = 3 = Map tiles in the texture height.

        [1][0] = 4 = Map viewport width.
        [1][1] = 5 = Map viewport height.
        [1][2] = 6 = Map viewport x1.
        [1][3] = 7 = Map viewport y1.

        [2][0] = 8 = TileSize width normalized.
        [2][1] = 9 = TileSize height normalized. 
        */
        this.shaderTileData = [
            30, 25, 8, 8, 
            30, 21, 5, 5, 
            0.125, 0.125, 1, 1, 
            1, 1, 1, 1
        ];
    }

    buildShaderTileData(viewportX1, viewportY1, viewportWidth, viewportHeight) {
        this.shaderTileData = [
            30, 25, 8, 8, 
            viewportWidth, viewportHeight, viewportX1, viewportY1, 
            0.125, 0.125, 1, 1, 
            1, 1, 1, 1
        ];
    }

    setUniformData(positionMatrix) {
        if (this.textures.length < 2)
            return false;
        this.program.setUniforms({
            'u_color': this.color.color,
            'u_matrix': positionMatrix,
            'u_depth': this.depth,
            'u_tileData': this.shaderTileData,
            'u_texture': this.textures[0].id,
            'u_mapDataTexture': this.textures[1].id,
        });
        return true;
    }
}