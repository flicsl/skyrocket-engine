import { BufferUtils } from "./utils";

export class TransformerFactory {
    static create(schema) {
        this._assertValidSchema(schema);
        return new Transformer(schema.network);
    }

    static _assertValidSchema(schema) {
        if (!schema.network)
            throw new Error("Given schema has no 'network' key!");
        const networkProperties = schema.network;
        for (let schemaAttribute in networkProperties) {
            const attribute = networkProperties[schemaAttribute];
            for (let schemaAttributeProperty in attribute) {
                const property = attribute[schemaAttributeProperty];
                switch (schemaAttributeProperty) {
                case "binaryFormat":
                    this._assertValidBinaryFormat(property);
                    break;
                default:
                    throw new Error(`Unknown schema attribute property: ${schemaAttributeProperty}`);
                }
            }
        }
    }

    static _assertValidBinaryFormat(binaryFormat) {
        return binaryFormat === "uint8" || binaryFormat === "uint16";
    }
}

class Transformer {
    constructor(networkSchema) {
        this._schema = networkSchema;
    }

    encodeProperty(name, value) {
        if (!this._schema[name])
            throw new Error(`No properties could be found for attribute ${name}.`);
        if (value == null)
            throw new Error(`Invalid value ${value}!`);

        const attributes = this._schema[name];

        switch (attributes.binaryFormat) {
        case "uint8":
            return BufferUtils.toUint8(value);
        case "uint16":
            return BufferUtils.toUint16(value);
        default:
            throw new Error(`No 'binaryFormat' specified for attribute ${name}.`);
        }
    }

    decodeProperty(name, buffer, offset = 0) {
        if (!this._schema[name])
            throw new Error(`No properties could be found for attribute ${name}.`);
        if (buffer == null)
            throw new Error(`Invalid buffer ${buffer}!`);

        const attributes = this._schema[name];

        switch (attributes.binaryFormat) {
        case "uint8":
            return BufferUtils.fromUint8(buffer, offset);
        case "uint16":
            return BufferUtils.fromUint16(buffer, offset);
        default:
            throw new Error(`No 'binaryFormat' specified for attribute ${name}.`);
        }

    }

    _retrieveAttributeProperties(name, networkSchema) {
        return networkSchema[name];
    }
}
