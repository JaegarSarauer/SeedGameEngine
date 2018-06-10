import Updateable from '../base/Updateable';
import Component from '../component/Component';
import Transform from '../component/Transform';

export default class GameObject extends Updateable {
    constructor(x = 0, y = 0, z = 0, scaleX = 1, scaleY = 1, scaleZ = 1, rotation = 0) {
        super();
        this.className = 'GameObject';

        this.components = {};
        this.addComponent(new Transform(x, y, z, scaleX, scaleY, scaleZ, rotation));
    }

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

    removeComponent(component) {
        if (this.components[component.className] == null)
            return false;
        for (let i = 0; i < this.components[component.className].length; i++) {
            if (this.components[component.className][i].id === component.id) {
                this.components[component.className][i].end();
                this.components[component.className].splice(i, 1);
                return true;
            }
        }
        return false;
    }

    removeComponents(componentName) {
        if (this.components[componentName] == null)
            return false;
        for (let i = 0; i < this.components[componentName].length; i++) {
            this.components[componentName][i].end();
            this.components[componentName].splice(i, 1);
        }
        return true;
    }

    removeAllComponents() {
        let compTypes = Object.keys(this.components);
        for (let i = 0; i < compTypes.length; i++) {
            let thisCompType = compTypes[i];
            for (let ii = 0; ii < this.components[thisCompType].length; ii++) {
                this.components[thisCompType][ii].end();
                this.components[thisCompType].splice(ii, 1);
            }
        }
        return true;
    }

    hasComponent(componentName) {
        if (this.components[componentName] == null) {
            return false;
        }
        return this.components[componentName].length > 0;
    }

    getComponent(componentName, index = 0) {
        if (this.components[componentName] == null) {
            return null;
        }
        return this.components[componentName][index];
    }

    updateComponents() {
        let compTypes = Object.keys(this.components);
        for (let i = 0; i < compTypes.length; i++) {
            let thisCompType = compTypes[i];
            for (let ii = 0; ii < this.components[thisCompType].length; ii++) {
                this.components[thisCompType][ii].update();
            }
        }
    }

    update() {
        if (this.hasPaused)
            return;
            
        if (this.hasStarted) {
            this.preUpdate();
            this.onUpdate();
            this.updateComponents();
            this.postUpdate();
        } else {
            this.start();
        }
    }

    preUpdate() {
        this.onPreUpdate();
    }

    postUpdate() {
        this.onPostUpdate();
    }

    onPreUpdate() {}
    onPostUpdate() {}
}