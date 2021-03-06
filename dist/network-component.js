"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NetworkComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = require("./component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NetworkComponent = exports.NetworkComponent = function (_Component) {
    _inherits(NetworkComponent, _Component);

    function NetworkComponent() {
        _classCallCheck(this, NetworkComponent);

        var _this = _possibleConstructorReturn(this, (NetworkComponent.__proto__ || Object.getPrototypeOf(NetworkComponent)).call(this));

        _this._messageHandlers = {};
        return _this;
    }

    _createClass(NetworkComponent, [{
        key: "registerMessageHandlers",
        value: function registerMessageHandlers(handlers) {
            this._messageHandlers = Object.assign({}, this._messageHandlers, handlers);
        }
    }, {
        key: "getMessageHandler",
        value: function getMessageHandler(messageId) {
            return this._messageHandlers[messageId];
        }
    }, {
        key: "_assertValidMessageHandlers",
        value: function _assertValidMessageHandlers(messageHandlers) {
            var valid = true;
            if (messageHandlers !== null && (typeof messageHandlers === "undefined" ? "undefined" : _typeof(messageHandlers)) === "object") {
                for (var key in messageHandlers) {
                    if (typeof messageHandlers[key] !== "function" || typeof key !== "string") {
                        valid = false;
                        break;
                    }
                }
            } else valid = false;
            return valid;
        }
    }]);

    return NetworkComponent;
}(_component.Component);