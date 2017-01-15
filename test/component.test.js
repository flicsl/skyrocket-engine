import { Component } from "../lib";
import { spy } from "sinon";
import { expect } from "chai";

describe("Component", () => {
    it("should fire registered event listeners with event data", () => {
        const component = new Component();
        const event = {
            type: "EVENT",
            data1: "data1",
            data2: ["data2"]
        };
        const callback = spy();
        component.registerEventListeners({
            "EVENT": callback
        }, {
            "EVENT_2": callback
        });
        component.fire(event);

        expect(callback).to.have.been.calledWith(event);
    });

    it("should listen for events emitted by children", () => {
        const component = new Component();
        const child = new Component();
        const callback = spy();
        const event = {
            type: "EVENT",
            data1: "data1"
        };
        component.registerEventListeners({
            "EVENT": callback
        });

        component.addChild(child);
        child.emit(event);

        expect(callback).to.have.been.calledWith(event);
    });
});
