import { NetworkComponent } from "../lib";
import { expect } from "chai";

describe("NetworkComponent", () => {
    it("should throw error if registering invalid messageHandlers", () => {
        const component = new NetworkComponent();
        expect(component.registerMessageHandlers.bind(this, {abc: "abc"})).to.throw(Error);
    });

    it("should allow message retrieval", () => {
        const component = new NetworkComponent();
        component.registerMessageHandlers({1: () => {}});
        expect(component.getMessageHandler(1)).to.be.a("function");
    });
});
