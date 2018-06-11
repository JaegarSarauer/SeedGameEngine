/**
 * A color with r, g, b, a values between 0 and 1.
 * 
 * Contains instatiation functions for creating default 
 * colors without explicitly defining the values.
 */
export default class Color {
    /**
     * Builds a color into an array for easy access for WebGL.
     * 
     * @param {number} r Red value between 0 - 1
     * @param {number} g Green value between 0 - 1
     * @param {number} b Blue value between 0 - 1
     * @param {number} a Alpha value between 0 - 1
     */
    constructor(r = 1, g = 0.078, b = 0.576, a = 1) {
        this.color = [r, g, b, a];
    }

    /**
     * 
     * @param {number} r Red value between 0 - 1. Defaults to previous value.
     * @param {number} g Green value between 0 - 1. Defaults to previous value.
     * @param {number} b Blue value between 0 - 1. Defaults to previous value.
     * @param {number} a Alpha value between 0 - 1. Defaults to previous value.
     */
    set(r = this.color[0], b = this.color[1], g = this.color[2], a = this.color[3]) {
        this.color = [r, g, b, a];
    }

    /**
     * Returns a new color with the color green. Value: #00FF00 with alpha 1.
     */
    static green() {
        return new Color(0, 1, 0, 1);
    }

    /**
     * Returns a new color with the color blue. Value: #0000FF with alpha 1.
     */
    static blue() {
        return new Color(0, 0, 1, 1);
    }

    /**
     * Returns a new color with the color red. Value: #FF0000 with alpha 1.
     */
    static red() {
        return new Color(1, 0, 0, 1);
    }

    /**
     * Returns a new color with the color pink. Value: #FF1493 with alpha 1.
     */
    static pink() {
        return new Color([1, 0.078, 0.576, 1]);
    }
}