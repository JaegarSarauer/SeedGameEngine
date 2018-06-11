import Updateable from '../base/Updateable';
import Component from '../component/Component';
import Transform from '../component/Transform';

/**
 * Baseclass GameObject which derives from Updateable.
 * 
 * Do not derive this class directly! GameObjects are not managed until they are assigned to a manager.
 * Instead, derive SceneObject or PersistentObject to create objects that exist the scope of a scene, or the scope of the game.
 * 
 * All objects that should exist in the game screen should derive this. 
 */
export default class GameObject extends Updateable {
    /**
     * Default position, size and rotation of the Object.
     * 
     * @param {Point} position A point of creation in the world.
     * @param {Point} size A point representing scale of the object.
     * @param {number} rotation A number representing angular rotation (in degrees).
     */
    constructor(position = new Point(0, 0, 0), size = new Point(32, 32, 1), rotation = 0) {
        super();
        this.className = 'GameObject';

        this.components = {};
        this.addComponent(new Transform(position, size, rotation));
        this.transform = this.getComponent("Transform");
    }

    /**
     * Adds a component to this game object, and keeps reference to it.
     * GameObjects will handle their components as they are added to the object.
     * 
     * @param {Component} component The component assigned to this object.
     */
    addComponent(component) {
        if (this.components[component.className] == null) {
            this.components[component.className] = [];
        }
        if (component.isUnique && this.components[component.className].length > 0) {
            throw 'There is already a unique component of type ' + component.className + ' on this GameObject!';
            return false;
        }
        this.components[component.className].push(component);
        component.gameObject = this;
        component.onAddComponent();
        return true;
    }

    /**
     * Removes a single component from this GameObject by ID.
     * 
     * @param {number} componentID Id of the component to remove.
     */
    removeComponent(componentID) {
        if (this.components[component.className] == null)
            return false;
        for (let i = 0; i < this.components[component.className].length; i++) {
            if (this.components[component.className][i].id === componentID) {
                this.components[component.className][i].end();
                this.components[component.className].splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
     * Removes all Components of the named type.
     * 
     * @param {string} componentName The name of the components to clear.
     */
    removeComponents(componentName) {
        if (this.components[componentName] == null)
            return false;
        for (let i = 0; i < this.components[componentName].length; i++) {
            this.components[componentName][i].end();
            this.components[componentName].splice(i, 1);
        }
        return true;
    }

    /**
     * Removes all components except for the Transform component.
     */
    removeAllComponents() {
        let compTypes = Object.keys(this.components);
        for (let i = 0; i < compTypes.length; i++) {
            let thisCompType = compTypes[i];
            if (thisCompType === 'Transform')
                continue;
            for (let ii = 0; ii < this.components[thisCompType].length; ii++) {
                this.components[thisCompType][ii].end();
                this.components[thisCompType].splice(ii, 1);
            }
        }
        return true;
    }

    /**
     * Returns a boolean on if there is a component of type {componentName}.
     * 
     * @param {string} componentName Name of the component type to search for.
     * 
     * @returns {boolean} true if there is at least one component of this type.
     */
    hasComponent(componentName) {
        if (this.components[componentName] == null) {
            return false;
        }
        return this.components[componentName].length > 0;
    }

    /**
     * Returns a component of type {componentName}. The second parameter can determine which 
     * Component of that type to return if there are more than 1. 
     * 
     * @param {string} componentName Name of the component type to return.
     * @param {*} index Index of the component to get. Defaults to first component.
     */
    getComponent(componentName, index = 0) {
        if (this.components[componentName] == null) {
            return null;
        }
        return this.components[componentName][index];
    }

    /**
     * Updates all components on this GameObject.
     */
    updateComponents() {
        let compTypes = Object.keys(this.components);
        for (let i = 0; i < compTypes.length; i++) {
            let thisCompType = compTypes[i];
            for (let ii = 0; ii < this.components[thisCompType].length; ii++) {
                this.components[thisCompType][ii].update();
            }
        }
    }
    
    /**
     * Rewritten postStartUpdate() functions which is originally defined in Updateable.
     * The GameObject adds a pre and post update function, and respective overrideable callbacks
     * (onPreUpdate and onPostUpdate).
     */
    postStartUpdate() {
        if (this.hasPaused)
            return;
        
        this.preUpdate();
        this.onUpdate();
        this.updateComponents();
        this.postUpdate();
    }

    /**
     * Called by the GameObject before an update to do default calls for preUpdating. Afterwards it
     * calls the overrideable function, onPreUpdate.
     */
    preUpdate() {
        this.onPreUpdate();
    }

    /**
     * Called by the GameObject after an update to do default calls for postUpdating. Afterwards it
     * calls the overrideable function, onPostUpdate.
     */
    postUpdate() {
        this.onPostUpdate();
    }

    /**
     * Override for Pre Update functionality.
     */
    onPreUpdate() {}

    /**
     * Override for Post Update functionality.
     */
    onPostUpdate() {}
}