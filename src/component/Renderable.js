import Component from './Component';
import SceneManager from '../manager/SceneManager';
import RenderManager from '../manager/RenderManager';
import ProgramManager from '../manager/ProgramManager';
import Matrix3 from '../render/WebGL/Matrix3';
import Color from '../internal/Color';

const DepthRange = 10000000;

/**
 * Base Renderable Component for all Components that want to draw to the screen. If
 * you want to show something on screen, it should derive Renderable.
 * 
 * Contained in the class are functions for attaching the Renderable to viewports,
 * and updating Transform data into matricies for use with the Render Manager.
 * 
 * The Renderable Component contains data on how the Renderable expects to be rendered.
 * Programs, render vectors, shader data, and other data that is on a per-object basis
 * for rendering is defined here.
 * 
 * Classes which derive a Renderable should handle all base data and add or modify data
 * as needed to achieve certain effects.
 */
export default class Renderable extends Component {
    /**
     * Constructor for the Renderable component. Allows defaults to be assigned without
     * having to call setter functions later.
     * 
     * @param {Program} program A Program Object from the ProgramManager.
     */
    constructor(program = ProgramManager.getProgram('Default')) {
        super(true);
        this.deregisterViewports = {};

        //currently unused
        this.program = program;
        this._matrixPosition = new Matrix3();
        this._matrixScale = new Matrix3();
        this._matrixRotation = new Matrix3();
        this._matrixOriginOffset = new Matrix3();
        this.color = new Color();
        this.renderPositions = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];
        this.primitiveType = RenderManager.GL.TRIANGLES;
        this.primitiveCount = 6;

        //textures
        this.textures = [];
        this._subSpriteData = [0, 0, 1, 1];
        
        this.depth = 0.5;
    }

    requestRedraw() {
        RenderManager.forceUpdate();
    }

    setColor(r, g, b, a) {
        this.color.set(r, g, b, a);
        this.requestRedraw();
    }

    setDepth(depth) {
        this.depth = (Math.max(-DepthRange, Math.min(depth, DepthRange)) + DepthRange) / (DepthRange * 2);
        this.requestRedraw();
    }

    setSubIndex(spriteIndex) {
        if (this.textures.length < 1)
            return;

        let framesWidth = this.textures[0].frameWidth / this.textures[0].width;
        let framesHeight = this.textures[0].frameHeight / this.textures[0].height;

        let frameWidthIndex = spriteIndex % (1 / framesWidth);
        let frameHeightIndex = Math.floor(spriteIndex * framesWidth);

        this._subSpriteData = [-frameWidthIndex, -frameHeightIndex, framesWidth, framesHeight];
        this.requestRedraw();
    }

    setUniformData(positionMatrix) {
        this.program.setUniforms({
            'u_color': this.color.color,
            'u_matrix': positionMatrix,
            'u_depth': this.depth,
            'u_texture': 0,
            'u_subTexcoord': this._subSpriteData,
        });
        return true;
    }

    setTexture(textureObject) {
        this.textures[0] = textureObject;
        this.requestRedraw();
    }

    /**
     * Returns a joined matrix of position, scale, rotation and origin adjustment.
     */
    getMatrix() {       
        return Matrix3.copy(this._matrixPosition).multiply(this._matrixRotation).multiply(this._matrixScale).multiply(this._matrixOriginOffset);
    }

    /**
     * Sets the position matrix to the new position point assigned.
     * 
     * @param {Point} point A position point.
     */
    setPosition(point) {
        this._matrixPosition.setPosition(point.x, point.y); //point.z if we had 3D to override this
        this.requestRedraw();
    }

    /**
     * Sets the origin offset matrix to the new position point assigned. This matrix reacts differently from other matrix
     * assignment. 0,0 is regular top left corner origin, -0.5, -0.5 centers the origin to the center of the Transform, and
     * -1, -1 will align the origin to the bottom right.
     * 
     * @param {Point} point Origin offset point.
     */
    setOriginOffset(point) {
        this._matrixOriginOffset.setPosition(point.x, point.y); //point.z if we had 3D to override this
    }

    /**
     * Sets the rotation matrix to the new rotation value assigned.
     * 
     * TODO: Change to a rotation point for x, y, z rotation instead of just z.
     * 
     * @param {number} rotation A rotation in degrees.
     */
    setRotation(rotation) {
        this._matrixRotation.setRotation(rotation);
        this.requestRedraw();
    }

    /**
     * Sets the scale matrix to the new scale point assigned.
     * 
     * @param {Point} scale A scale point.
     */
    setScale(scale) {
        this._matrixScale.setScale(scale.x, scale.y);
        this.requestRedraw();
    }

    /**
     * Called immediatly after the Render component is added to a game object.
     * 
     * Updates the data of this renderable to the current Transform data.
     */
    onAddComponent() {
        let transform = this.gameObject.getComponent("Transform");
        transform.renderable = this;
        this.setPosition(transform._position);
        this.setScale(transform._scale);
        this.setRotation(transform._rotation);
        this.requestRedraw();
    }

    /**
     * Adds this component to another viewport to be drawn. 
     * 
     * @param {number} viewportID Object ID of the viewport.
     */
    addToViewport(viewportID) {
        this.deregisterViewports[viewportID] = SceneManager.getCurrentScene().registerRenderableComponent(this, viewportID);
        this.requestRedraw();
        return this;
    }

    /**
     * Removes the renderable from all viewports.
     */
    removeFromViewports() {
        let objKeys = Object.keys(this.deregisterViewports);
        for (let i = 0; i < objKeys.length; i++) {
            this.deregisterViewports[objKeys[i]]();
        }
        this.requestRedraw();
    }

    onEnd() {
        this.removeFromViewports();
    }
}