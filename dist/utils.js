"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BufferUtils = exports.BufferUtils = function () {
    function BufferUtils() {
        _classCallCheck(this, BufferUtils);
    }

    _createClass(BufferUtils, null, [{
        key: "areEqual",
        value: function areEqual(buf1, buf2) {
            if (buf1.byteLength !== buf2.byteLength) return false;

            var dv1 = new Int8Array(buf1);
            var dv2 = new Int8Array(buf2);
            for (var i = 0; i !== buf1.byteLength; i++) {
                if (dv1[i] !== dv2[i]) return false;
            }

            return true;
        }
    }, {
        key: "concat",
        value: function concat() {
            var length = 0;
            var buffer = null;

            for (var i in arguments) {
                buffer = arguments[i];
                length += buffer.byteLength;
            }

            var joined = new Uint8Array(length);
            var offset = 0;

            for (var _i in arguments) {
                buffer = arguments[_i];
                joined.set(new Uint8Array(buffer), offset);
                offset += buffer.byteLength;
            }

            return joined.buffer;
        }
    }, {
        key: "segment",
        value: function segment(buffer, offset, byteLength) {
            return new DataView(buffer, offset, byteLength).buffer;
        }

        // As in http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer

    }, {
        key: "toArrayBuffer",
        value: function toArrayBuffer(buf) {
            var ab = new ArrayBuffer(buf.length);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buf.length; ++i) {
                view[i] = buf[i];
            }return ab;
        }
    }, {
        key: "toUint8",
        value: function toUint8(v) {
            var dv = this.toDataView(v, 1);
            dv.setUint8(0, v);
            return dv.buffer;
        }
    }, {
        key: "toUint16",
        value: function toUint16(v) {
            var dv = this.toDataView(v, 2);
            dv.setUint16(0, v);
            return dv.buffer;
        }

        // As in http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers

    }, {
        key: "ab2str",
        value: function ab2str(buf) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var bf = buf.slice(offset);
            return String.fromCharCode.apply(null, new Uint16Array(bf, 0));
        }

        // As in http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers

    }, {
        key: "str2ab",
        value: function str2ab(str) {
            var buf = new ArrayBuffer(str.length * 2);
            var bufView = new Uint16Array(buf, 0);
            for (var i = 0, strLen = str.length; i < strLen; i++) {
                bufView[i] = str.charCodeAt(i);
            }
            return buf;
        }
    }, {
        key: "fromUint8",
        value: function fromUint8(buf) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return new DataView(buf, offset, 1).getUint8(0);
        }
    }, {
        key: "fromUint16",
        value: function fromUint16(buf) {
            var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            return new DataView(buf, offset, 2).getUint16(0);
        }
    }, {
        key: "toDataView",
        value: function toDataView(value, n) {
            var buffer = new ArrayBuffer(n);
            var dv = new DataView(buffer, 0);
            return dv;
        }
    }]);

    return BufferUtils;
}();