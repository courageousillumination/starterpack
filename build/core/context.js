"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var readline_1 = __importDefault(require("readline"));
var promptAsync = function (rl, prompt) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                rl.question(prompt, function (answer) { return resolve(answer); });
            })];
    });
}); };
var Context = /** @class */ (function () {
    function Context() {
        this.files = [];
        this.options = [];
    }
    Context.prototype.registerConfigOption = function (configOption) {
        this.options.push(configOption);
    };
    Context.prototype.addFile = function (file) {
        this.files.push(file);
    };
    Context.prototype.write = function (location) {
        return __awaiter(this, void 0, void 0, function () {
            var rl, configuration, _i, _a, configOption, _b, _c, _d, _e, file;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        rl = readline_1.default.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });
                        configuration = {};
                        _i = 0, _a = this.options;
                        _f.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        configOption = _a[_i];
                        if (!configOption.prompt) return [3 /*break*/, 3];
                        _b = configuration;
                        _c = configOption.name;
                        return [4 /*yield*/, promptAsync(rl, configOption.prompt)];
                    case 2:
                        _b[_c] = _f.sent();
                        _f.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, fs_1.promises.mkdir(location, { recursive: true })];
                    case 5:
                        _f.sent();
                        _d = 0, _e = this.files;
                        _f.label = 6;
                    case 6:
                        if (!(_d < _e.length)) return [3 /*break*/, 9];
                        file = _e[_d];
                        return [4 /*yield*/, file.write(location, configuration)];
                    case 7:
                        _f.sent();
                        _f.label = 8;
                    case 8:
                        _d++;
                        return [3 /*break*/, 6];
                    case 9:
                        rl.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Context;
}());
exports.default = Context;
