import Renderable from './Renderable';
import Matrix3 from '../render/WebGL/Matrix3';
import ProgramManager from '../manager/ProgramManager';
import TextureManager from '../manager/TextureManager';
import RenderManager from '../manager/RenderManager';
import Renderable2DMultitex from './Renderable2DMultitex';

var dataTexCounter = 0;

/**
 * Renderable2DGrid is a renderable component which uses two textures to draw
 * tilemaps using the GPU, and just one renderable. Renderable2DGrid will expect one
 * texture for sprites, and another containing the data for which tile goes where.
 * Additionaly, viewport support is added to make large maps require one time loads into self
 * managed data textures.
 */
export default class Renderable2DGrid extends Renderable2DMultitex {
    /**
     * Constructor for Renderable2D grid. Sets up data and initializes a data texture.
     * 
     * @param {string} mapTilesTextureName Name of sprite sheet texture.
     * @param {Array} gridData Array of indexes for each tile on the map.
     * @param {number} width Width of the map.
     * @param {number} height Height of the map.
     * @param {number} tileViewWidth Width of the viewport.
     * @param {number} tileViewHeight Height of the viewport.
     */
    constructor(mapTilesTextureName, gridData, width, height, tileViewWidth, tileViewHeight) {
        super(ProgramManager.getProgram('2DGrid'));
        this.className = 'Renderable2DGrid';

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
        this.shaderTileData = [];
        this.mapTilesTexture = TextureManager.getTexture(mapTilesTextureName);
        this.addTexture(this.mapTilesTexture);
        this.mapTilesDataTextureName = mapTilesTextureName + 'Data' + dataTexCounter++;
        this.setGridData(gridData, width, height, tileViewWidth, tileViewHeight);
    }

    /**
     * Updates the data texture by quadrant. Quadrant is specified by the x1, y1, 
     * width, and height parameters.
     * 
     * @param {Array} data Array of values indicating the index of each sprite.
     * @param {number} x1 Top left x position to update.
     * @param {number} y1 Top left y position to update.
     * @param {number} width Width (in tiles) of data to update.
     * @param {number} height Height (in tiles) of data to update.
     */
    updateGridData(data, x1, y1, width, height) {
        let dataArray = new Uint16Array(data);
        this.buildShaderTileData(x1, y1, width, height);
        TextureManager.updateDataTexture(this.mapTilesDataTextureName, dataArray, x1, y1, width, height);
        this.requestRedraw();
    }

    setGridData(data, width, height, tileViewWidth, tileViewHeight) {
        let dataArray = new Uint16Array(data);
        let texture = TextureManager.addDataTexture(this.mapTilesDataTextureName, dataArray, RenderManager.GL.R16UI, RenderManager.GL.RED_INTEGER, RenderManager.GL.UNSIGNED_SHORT, -1, -1, width, height);
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
            width, height, this.mapTilesTexture.framesWidth, this.mapTilesTexture.framesHeight, 
            tileViewWidth, tileViewHeight, 0, 0, 
            1 / this.mapTilesTexture.framesWidth, 1 / this.mapTilesTexture.framesHeight, 1, 1, 
            1, 1, 1, 1
        ];
    }

    /**
     * Sets the viewport of the map grid to x1, y1, width, height (in tiles).
     * 
     * @param {number} viewportX1 Top left x position of the viewport.
     * @param {number} viewportY1 Top left y position of the viewport.
     * @param {number} viewportWidth Width of the viewport
     * @param {number} viewportHeight 
     */
    buildShaderTileData(viewportX1, viewportY1, viewportWidth, viewportHeight) {
        this.shaderTileData[4] = viewportWidth;
        this.shaderTileData[5] = viewportHeight;
        this.shaderTileData[6] = viewportX1;
        this.shaderTileData[7] = viewportY1;
    }

    onEnd() {
        this.removeFromViewports();
        TextureManager.removeTexture(this.mapTilesDataTextureName);
    }

    /**
     * Updates the uniforms of this renderable. Requires a position matrix for 
     * perspective calculations by the RendererManager.
     * 
     * @param {Matrix3} positionMatrix Position matrix of this renderable.
     */
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