const ManagerInstances = {};

export default class Manager {
    constructor(manager, name) {
        if (ManagerInstances[name]) {
            throw 'This manager already has an instance, reference as .i()';
        }
        ManagerInstances[name] = manager;
    }
}