export class BufferUtils {
    static areEqual(buf1, buf2) {
        if (buf1.byteLength !== buf2.byteLength)
            return false;

        const dv1 = new Int8Array(buf1);
        const dv2 = new Int8Array(buf2);
        for (let i = 0 ; i !== buf1.byteLength ; i++) {
            if (dv1[i] !== dv2[i]) return false;
        }

        return true;
    }

    static concat() {
        let length = 0;
        let buffer = null;

        for (let i in arguments) {
            buffer = arguments[i];
            length += buffer.byteLength;
        }

        let joined = new Uint8Array(length);
        let offset = 0;

        for (let i in arguments) {
            buffer = arguments[i];
            joined.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        }

        return joined.buffer;
    }

    static segment(buffer, offset, byteLength) {
        return new DataView(buffer, offset, byteLength).buffer;
    }

    // As in http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer
    static toArrayBuffer(buf) {
        const ab = new ArrayBuffer(buf.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < buf.length; ++i)
            view[i] = buf[i];
        return ab;
    }

    static toUint8(v) {
        const dv = this.toDataView(v, 1);
        dv.setUint8(0, v);
        return dv.buffer;
    }

    static toUint16(v) {
        const dv = this.toDataView(v, 2);
        dv.setUint16(0, v);
        return dv.buffer;
    }

    // As in http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
    static ab2str(buf, offset = 0) {
        const bf = buf.slice(offset);
        return String.fromCharCode.apply(null, new Uint16Array(bf, 0));
    }

    // As in http://stackoverflow.com/questions/6965107/converting-between-strings-and-arraybuffers
    static str2ab(str) {
        const buf = new ArrayBuffer(str.length * 2);
        const bufView = new Uint16Array(buf, 0);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    static fromUint8(buf, offset = 0) {
        return new DataView(buf, offset, 1).getUint8(0);
    }

    static fromUint16(buf, offset = 0) {
        return new DataView(buf, offset, 2).getUint16(0);
    }

    static toDataView(value, n) {
        const buffer = new ArrayBuffer(n);
        const dv = new DataView(buffer, 0);
        return dv;
    }
}
