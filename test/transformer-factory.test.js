import { TransformerFactory } from "../lib";
import { expect } from "chai";

describe("TransformerFactory", () => {
    it("should throw error if no 'network' key in object", () => {
        const schema = {"invalid": true};
        expect(TransformerFactory.create.bind(this, schema)).to.throw(Error);
    });

    describe("network attributes", () => {
        it("should throw error if invalid binaryFormat", () => {
            const schema = {
                network: {
                    attr: {
                        binaryFormat: "invalid"
                    }
                }
            };
            expect(TransformerFactory.create.bind(this, schema)).to.throw(Error);
        });
    });

    describe("transformer", () => {
        it("should encode and decode uint8 properties", () => {
            const schema = {
                network: {
                    attr: {
                        binaryFormat: "uint8"
                    }
                }
            };
            const transformer = TransformerFactory.create(schema);
            const value = 254;
            const decoded = transformer.decodeProperty("attr", transformer.encodeProperty("attr", value));
            expect(decoded).to.equal(value);
        });

        it("should encode and decode uint16 properties", () => {
            const schema = {
                network: {
                    attr: {
                        binaryFormat: "uint16"
                    }
                }
            };
            const transformer = TransformerFactory.create(schema);
            const value = 65450;
            const decoded = transformer.decodeProperty("attr", transformer.encodeProperty("attr", value));
            expect(decoded).to.equal(value);
        });
    });
});
