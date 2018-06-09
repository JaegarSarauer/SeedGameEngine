import Manager from './Manager';

export class _DOMManager extends Manager {
    constructor() {
        super();
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

const DOMManager = new _DOMManager();
export default DOMManager;