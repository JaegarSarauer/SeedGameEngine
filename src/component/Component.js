import Updateable from '../base/Updateable';

export default class Component extends Updateable {
    /**
     * Constructor for Base Components.
     * Requires a boolean to indicate if a GameObject can contain multiple
     * components of this type.
     * 
     * @param {boolean} unique Is there only one of these component allowed on a GameObject?
     */
    constructor(unique) {
        super();
        this.isUnique = unique;
    }

    /**
     * Called when the component is successfully added to a GameObject.
     */
    onComponentAdd() {}
}