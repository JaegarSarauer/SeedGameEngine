import Updateable from '../base/Updateable';

/**
 * A component may be added to any GameObject by using
 * GameObject's function: addComponent(component).
 * 
 * A component should redefine the Updateable functions inherited with custom code to define the Component functionality.
 */
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
        this.className='Component';
        this.isUnique = unique;
    }

    /**
     * Called when the component is successfully added to a GameObject.
     */
    onAddComponent() {}
}