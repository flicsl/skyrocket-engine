"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TransformerFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransformerFactory = exports.TransformerFactory = function () {
    function TransformerFactory() {
        _classCallCheck(this, TransformerFactory);
    }

    _createClass(TransformerFactory, null, [{
        key: "create",
        value: function create(schema) {
            this._assertValidSchema(schema);
            return new Transformer(schema.network);
        }
    }, {
        key: "_assertValidSchema",
        value: function _assertValidSchema(schema) {
            if (!schema.network) throw new Error("Given schema has no 'network' key!");
            var networkProperties = schema.network;
            for (var schemaAttribute in networkProperties) {
                var attribute = networkProperties[schemaAttribute];
                for (var schemaAttributeProperty in attribute) {
                    var property = attribute[schemaAttributeProperty];
                    switch (schemaAttributeProperty) {
                        case "binaryFormat":
                            this._assertValidBinaryFormat(property);
                            break;
                        default:
                            throw new Error("Unknown schema attribute property: " + schemaAttributeProperty);
                    }
                }
            }
        }
    }, {
        key: "_assertValidBinaryFormat",
        value: function _assertValidBinaryFormat(binaryFormat) {
            return binaryFormat === "uint8" || binaryFormat === "uint16";
        }
    }]);

    return TransformerFactory;
}();

var Transformer = function () {
    function Transformer(networkSchema) {
        _classCallCheck(this, Transformer);

        this._schema = networkSchema;
    }

    _createClass(Transformer, [{
        key: "encodeAttribute",
        value: function encodeAttribute(name, value) {
            if (!this._schema[name]) throw new Error("No properties could be found for attribute " + name + ".");
            if (value == null) throw new Error("Invalid value " + value + "!");

            var attributes = this._schema[name];

            switch (attributes.binaryFormat) {
                case "uint8":
                    return _utils.BufferUtils.toUint8(value);
                case "uint16":
                    return _utils.BufferUtils.toUint16(value);
                default:
                    throw new Error("No 'binaryFormat' specified for attribute " + name + ".");
            }
        }
    }, {
        key: "encode",
        value: function encode(object) {
            var encoded = new ArrayBuffer(0);
            for (var attribute in this._schema) {
                encoded = _utils.BufferUtils.concat(encoded, this.encodeAttribute(attribute, object[attribute]));
            }
            return encoded;
        }
    }, {
        key: "decodeAttribute",
        value: function decodeAttribute(name, buffer) {
            var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            if (!this._schema[name]) throw new Error("No properties could be found for attribute " + name + ".");
            if (buffer == null) throw new Error("Invalid buffer " + buffer + "!");

            var attributes = this._schema[name];

            switch (attributes.binaryFormat) {
                case "uint8":
                    return _utils.BufferUtils.fromUint8(buffer, offset);
                case "uint16":
                    return _utils.BufferUtils.fromUint16(buffer, offset);
                default:
                    throw new Error("No 'binaryFormat' specified for attribute " + name + ".");
            }
        }
    }, {
        key: "decode",
        value: function decode(buffer) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var decoded = {};
            var index = 0;
            for (var attribute in this._schema) {
                decoded[attribute] = this.decodeAttribute(attribute, buffer, index + offset);
                var binaryFormat = this._schema[attribute].binaryFormat;
                if (binaryFormat === "uint8") index += 1;
                if (binaryFormat === "uint16") index += 2;
            }
            return decoded;
        }
    }]);

    return Transformer;
}();