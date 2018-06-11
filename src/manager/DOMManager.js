import Manager from './Manager';

/**
 * Manages the connection between the DOM and the Game & Engine.
 * 
 * The DOMManager sets up and holds reference to the DOM elements required to display the game.
 */
export class _DOMManager extends Manager {
    /**
     * Initializes defaults for the DOMManager to hold once started.
     */
    constructor() {
        super();
        this.canvas = null;
        this.GL = null;
    }

    /**
     * Loads the canvas & setup for WebGL.
     */
    start() {
        this.loadCanvas();
    }
    
    /**
     * Loads the canvas & sets up a WebGL2 context to be used by the engine by the id 'game'. If nothing is happening on screen,
     * ensure that the canvas you are using has this id in its HTML tag.
     */
    loadCanvas() {
        this.canvas = document.getElementById('game');
        if (this.canvas == null)
            throw "Error finding DOM Canvas. The canvas requires an id='game'";
        this.GL = this.canvas.getContext('webgl2');
    }
}

/**
 * Singleton reference to the DOM Manager.
 */
const DOMManager = new _DOMManager();
export default DOMManager;