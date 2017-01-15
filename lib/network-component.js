import { Component } from "./component";

export class NetworkComponent extends Component {
    constructor() {
        super();
        this._messageHandlers = {};
    }

    registerMessageHandlers(handlers) {
        this._messageHandlers = Object.assign({}, handlers);
    }

    getMessageHandler(messageId) {
        return this._messageHandlers[messageId];
    }

    _assertValidMessageHandlers(messageHandlers) {
        let valid = true;
        if (messageHandlers !== null && typeof messageHandlers === "object") {
            for (let key in messageHandlers) {
                if (typeof messageHandlers[key] !== "function" || typeof key !== "string") {
                    valid = false;
                    break;
                }
            }
        } else
            valid = false;
        return valid;
    }
}
