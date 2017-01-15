"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
    function Component() {
        _classCallCheck(this, Component);

        this._parent = null;
        this._eventListeners = {};
    }

    _createClass(Component, [{
        key: "addChild",
        value: function addChild(component) {
            if (!component) throw new Error("Component " + component + " given to Component is not valid!");
            component._setParent(this);
        }
    }, {
        key: "_setParent",
        value: function _setParent(parent) {
            if (!parent) throw new Error("Tried to set parent to invalid " + parent + " value.");
            this._parent = parent;
        }
    }, {
        key: "registerEventListeners",
        value: function registerEventListeners(eventListeners) {
            // TODO: validate every individual key to ensure listeners are valid
            if (this._assertValidEventListeners(eventListeners)) this._eventListeners = Object.assign({}, this._eventListeners, eventListeners);else throw new Error("The passed event listeners object is not valid. You must pass an object where\n                            the keys are the event types and the values are the callback.");
        }
    }, {
        key: "_assertValidEventListeners",
        value: function _assertValidEventListeners(eventListeners) {
            var valid = true;
            if (eventListeners !== null && (typeof eventListeners === "undefined" ? "undefined" : _typeof(eventListeners)) === "object") {
                for (var key in eventListeners) {
                    if (typeof eventListeners[key] !== "function" || typeof key !== "string") {
                        valid = false;
                        break;
                    }
                }
            } else valid = false;
            return valid;
        }
    }, {
        key: "fire",
        value: function fire(event) {
            this._assertValidEvent(event);
            this.on(event);
        }
    }, {
        key: "emit",
        value: function emit(event) {
            this._assertValidEvent(event);
            this._parent && this._parent.on(event);
        }
    }, {
        key: "on",
        value: function on(event) {
            this._assertValidEvent(event);
            var handler = this.getEventHandler(event);
            handler && handler(event);
        }
    }, {
        key: "getEventHandler",
        value: function getEventHandler(event) {
            this._assertValidEvent(event);
            return this._eventListeners[event.type];
        }
    }, {
        key: "_assertValidEvent",
        value: function _assertValidEvent(event) {
            if (!event) throw new Error("Given event with value " + event + " is not valid!");
            if (!event.type) throw new Error("Given event with value " + event + " does not have a 'type' key!");
        }
    }]);

    return Component;
}();