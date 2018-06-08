import Manager from './Manager';

export default class DOMManager extends Manager {
    constructor() {
        super(this, "DOMManager");
        this.canvas = null;
        this.GL = null;
    }

    start() {
        this.loadCanvas();
    }

    loadCanvas() {
        this.canvas = document.getElementById('game');
        if (this.canvas == null)
            throw "Error finding DOM Canvas. The canvas requires an id='game'";
        this.GL = this.canvas.getContext('webgl2');
    }
}