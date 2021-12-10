"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var errors_1 = require("../../errors");
var models_1 = require("../../models");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var middlewares_1 = require("../../middlewares");
var router = express_1.default.Router();
// @route POST 
// @desc sign up a user
// @access public
router.post('/', [
    (0, express_validator_1.body)('email').
        trim()
        .not()
        .isEmpty()
        .isEmail()
        .withMessage(' Email is invalid'),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 6, max: 20 })
        .withMessage(' Password must be between 6 and 20 characters.'),
], middlewares_1.validateRequest, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, password2, user, exists, e_1, e_2, uJwt;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, password2 = _a.password2;
                if ('' + password.trim() !== '' + password2.trim()) {
                    throw new errors_1.BadRequest("Passwords do not match");
                }
                user = null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.User.findOne({ email: email })];
            case 2:
                exists = _b.sent();
                if (exists) {
                    console.log("Email is in use");
                    throw new errors_1.BadRequest('Email is already registered.');
                }
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log({ e: e_1 });
                throw e_1;
            case 4:
                _b.trys.push([4, 6, , 7]);
                user = models_1.User.build({ email: email, password: password });
                return [4 /*yield*/, user.save()];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                e_2 = _b.sent();
                console.log({ e: e_2 });
                return [2 /*return*/, res.status(400).send({ errors: [{ msg: "An error has occured." }] })];
            case 7:
                uJwt = jsonwebtoken_1.default.sign({
                    id: user.id,
                    email: user.email
                }, "" + process.env.JWT_KEY);
                req.session = {
                    jwt: uJwt
                };
                return [2 /*return*/, res.status(201).send({
                        auxillaryId: uJwt,
                        user: user
                    })];
        }
    });
}); });
// @route 
// @desc 
// @access 
router.get('/', function (req, res) {
    res.send('Sign Up Endpoint');
    return;
});
exports.default = router;
