"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context = /** @class */ (function () {
    function Context() {
        this.files = [];
    }
    Context.prototype.addFile = function (file) {
        this.files.push(file);
    };
    return Context;
}());
exports.default = Context;
