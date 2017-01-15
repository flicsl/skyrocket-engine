export class Component {
    constructor() {
        this._parent = null;
        this._eventListeners = {};
    }

    addChild(component) {
        if (!component)
            throw new Error(`Component ${component} given to Component is not valid!`);
        component._setParent(this);
    }

    _setParent(parent) {
        if (!parent)
            throw new Error(`Tried to set parent to invalid ${parent} value.`);
        this._parent = parent;
    }

    registerEventListeners(eventListeners) {
        if (eventListeners !== null && typeof eventListeners === "object")
            this._eventListeners = Object.assign({}, this._eventListeners, eventListeners);
        else
            throw new Error(`The passed event listeners object is not valid. You must pass an object where
                            the keys are the event types and the values are the callback.`);
    }

    fire(event) {
        this._assertValidEvent(event);
        this.on(event);
    }

    emit(event) {
        this._assertValidEvent(event);
        this._parent && this._parent.on(event);
    }

    on(event) {
        this._assertValidEvent(event);
        const handler = this.getEventHandler(event);
        handler && handler(event);
    }

    getEventHandler(event) {
        this._assertValidEvent(event);
        return this._eventListeners[event.type];
    }

    _assertValidEvent(event) {
        if (!event)
            throw new Error(`Given event with value ${event} is not valid!`);
        if (!event.type)
            throw new Error(`Given event with value ${event} does not have a 'type' key!`);
    }
}
