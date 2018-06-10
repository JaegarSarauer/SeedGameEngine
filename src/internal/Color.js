export default class Color {
    constructor(r = 1, g = 0.078, b = 0.576, a = 1) {
        this.color = [r, g, b, a];
    }

    set(r = this.color[0], b = this.color[1], g = this.color[2], a = this.color[3]) {
        this.color = [r, g, b, a];
    }

    static green() {
        return new Color(0, 1, 0, 1);
    }

    static blue() {
        return new Color(0, 0, 1, 1);
    }

    static red() {
        return new Color(1, 0, 0, 1);
    }

    static pink() {
        return new Color([1, 0.078, 0.576, 1]);
    }
}