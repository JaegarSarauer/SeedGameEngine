import Updateable from '../base/Updateable';
import Component from '../component/Component';

export default class GameObject extends Updateable {
    constructor() {
        this.className = 'GameObject';

        this.components = {};
    }

    addComponent(component) {
        if (this.components[component.className] == null) {
            this.components[component.className] = {};
        } else if (component.isUnique) {
            throw 'There is already a unique component of type ' + component.className + ' on this GameObject!';
            return false;
        }
        this.components[component.className][component.id] = component;
        return true;
    }

    removeComponent(component) {
        if (this.components[component.className] == null)
            return false;
        if (this.components[component.className][component.id] == null)
            return false;
        this.components[component.className][component.id].onEnd();
        delete this.components[component.className][component.id];
        return true;
    }

    removeComponentByID(componentName, id) {
        if (this.components[componentName] == null)
            return false;
        if (this.components[componentName][id] == null)
            return false;
        this.components[componentName][id].onEnd();
        delete this.components[componentName][id];
        return true;
    }

    removeComponents(componentName) {
        if (this.components[componentName] == null)
            return false;
        let comps = Object.keys(this.components[componentName]);
        for (let i = 0; i < comps.length; i++) {
            this.components[componentName][comps[i]].onEnd();
            delete this.components[componentName][comps[i]];
        }
        return true;
    }

    removeAllComponents() {
        let compTypes = Object.keys(this.components);
        for (let i = 0; i < compTypes.length; i++) {
            let thisCompType = compTypes[i];
            let comps = Object.keys(this.components[thisCompType]);
            for (let j = 0; j < comps.length; j++) {
                this.components[thisCompType][comps[i]].onEnd();
                delete this.components[thisCompType][comps[i]];
            }
        }
        return true;
    }

    getComponent(componentName, id) {
        return (this.components[componentName][id] == null ? null : this.components[componentName][id]);
    }
}