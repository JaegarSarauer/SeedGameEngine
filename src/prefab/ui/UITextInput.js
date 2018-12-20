import { ClickController, Point, SceneObject, Renderable2D, UIManager, UIElement, InputManager, KeyCode } from '../../entry';
import UIPanel from './UIPanel';
import UIText from './UIText';

export default class UITextInput extends UIElement {
      constructor(viewport, x, y, w, h, text = '', requiresFocus = true) {
        super(new Point(x, y, 0), new Point(w, h, 0), 0);

        this.text = text;
        this.baseText = ''; //preceeding text always there.
        this.textView = text;
        this.textViewPassword = false;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.maxTextLength = 80;

        this.requiresFocus = requiresFocus;

        this.isFocussed = !this.requiresFocus;

        //called when enter/return key is pressed.
        this.onReturn = () => {};

        //Text
        this.textObject = new UIText(viewport, x + 5, y, w, h, this.text);
        this.textObject.setText(this.text, false, h);

        //text box
        this.textBoxObject = new UIPanel(viewport, x, y, w, h, this.uiStyle.textInputBoxTexture);
        this.textBoxObject.setColor(this.uiStyle.textAreaBackgroundColor.color[0], this.uiStyle.textAreaBackgroundColor.color[1], this.uiStyle.textAreaBackgroundColor.color[2], this.uiStyle.textAreaBackgroundColor.color[3]);

        //onclick
        this.textBoxObject.clickController = new ClickController(viewport, () => {
            if (!this.hasPaused)
                this.focus();
        }, () => {}, () => {
            if (!this.hasPaused)
                this.focus();
        }, () => {}, () => {
            if (!this.hasPaused)
                this.focus(false);
        });
        this.textBoxObject.addComponent(this.textBoxObject.clickController);

        //on keyboard input
        this.keyboardListenerHandle = null;
        this.setupKeyboardListener();
        this.setText(this.text);
    }

    focus(focus = true) {
        this.isFocussed = focus;
        this.setText(this.text);
    }

    isPassword(textViewPassword) {
        this.textViewPassword = textViewPassword;
        if (textViewPassword) {
            this.textView = this.text.replace(/./g, 'x');
        } else {
            this.textView = this.text;
        }
    }

    applyBaseText() {
        this.textView = this.baseText + this.textView;
    }

    getText() {
        return this.text;
    }

    _applyFilters() {
        this.isPassword(this.textViewPassword);
        this.applyBaseText();
    }

    _updateText(text) { 
        this.textObject.setText(text, false, this.h);
    }

    setText(text) {
        this.text = text;
        this._applyFilters();
        this._updateText(this.textView + (this.isFocussed || !this.requiresFocus ? '*' : ''));
    }

    setBaseText(text) {
        this.baseText = text;
        this._applyFilters();
        this._updateText(this.textView);
    }

    setOnReturn(callback) {
        this.onReturn = callback;
    }

    setDepth(depth) {
        this.textObject.setDepth(depth);
        this.textBoxObject.setDepth(depth);
    }

    setupKeyboardListener() {
        if (this.keyboardListenerHandle != null)
            this.keyboardListenerHandle.stop();
        this.keyboardListenerHandle = InputManager.events.watch(InputManager.EVENT.KEY, (event) => {
            if (!this.isFocussed && this.requiresFocus)
                return;
            
            //backspace
            if (event.code === 8)
                this.text = this.text.substring(0, this.text.length - 1);

            //return/enter
            if (event.code === 13 && InputManager.isKeyDown(KeyCode.ENTER)) {
                return this.onReturn();
            }
            
            if (this.text.length >= this.maxTextLength)
                return;

            //space & underscore are the same due to lack of characters (for now)
            if (event.code === 32 || event.code === 167)
                this.text += ' ';

            //numbers
            if ((event.code >= 48 && event.code <= 57))
                this.text += event.key;

            //letters
            if (event.code >= 64 && event.code <= 90)
                this.text += event.key;

            //      ; = , - . /
            if (event.code >= 186 && event.code <= 192 || event.code >= 219 && event.code <= 222)
                this.text += event.key;

            if (event.code == 106 || event.code == 107 || event.code == 109 || event.code == 111)
                this.text += event.key;


            this.setText(this.text);
        }, false);
    }

    onPause() {
        this.textObject.pause();
        this.textBoxObject.clickController.pause();
        this.textBoxObject.pause();
        if (this.keyboardListenerHandle != null)
            this.keyboardListenerHandle.stop();
    }

    onUnpause() {
        this.textObject.unpause();
        this.textBoxObject.unpause();
        this.textBoxObject.clickController.unpause();
        this.setupKeyboardListener();
        this.setText(this.text);
    }

    onEnd() {
        this.textObject.end();
        this.textBoxObject.clickController.end();
        this.textBoxObject.end();
        if (this.keyboardListenerHandle != null)
            this.keyboardListenerHandle.stop();
    }
}


