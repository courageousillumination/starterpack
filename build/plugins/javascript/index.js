"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = __importDefault(require("../../core/file"));
var main = function (context) {
    context.addFile(file_1.default.createFileFromTemplate("src/plugins/javascript/templates/package.json"));
};
exports.default = main;
