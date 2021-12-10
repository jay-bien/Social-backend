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
var errors_1 = require("../../errors");
var middlewares_1 = require("../../middlewares");
var express_validator_1 = require("express-validator");
var models_1 = require("../../models");
var router = express_1.default.Router();
router.post('/', middlewares_1.currentUser, middlewares_1.requireAuth, [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage("Title cannot be empty"),
    (0, express_validator_1.body)('content')
        .not()
        .isEmpty()
        .withMessage("Content cannot be empty"),
    (0, express_validator_1.body)('price')
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0.")
], middlewares_1.validateRequest, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, price, id, ticket, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, price = _a.price;
                id = req.currentUser.id;
                if (!title || !price)
                    throw new errors_1.BadRequest("Must include a title and a price.");
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                ticket = models_1.Ticket.build({ title: title, price: price, created_by: id });
                return [4 /*yield*/, ticket.save()];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                throw new errors_1.DatabaseConnectionError("We cannot complete this request.");
            case 4: return [2 /*return*/, res.status(201).send(ticket)];
        }
    });
}); });
router.get('/', middlewares_1.currentUser, middlewares_1.requireAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.Ticket.find()];
            case 1:
                tickets = _a.sent();
                return [2 /*return*/, res.status(200).send({ tickets: tickets })];
            case 2:
                e_2 = _a.sent();
                console.log({ e: e_2 });
                throw new errors_1.DatabaseConnectionError("We cannot complete the request");
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/:ticket_id', middlewares_1.currentUser, middlewares_1.requireAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, ticket, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketId = req.params.ticket_id;
                if (!ticketId)
                    throw new errors_1.BadRequest("Cannot retrieve that ticket.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Ticket.findById(ticketId)];
            case 2:
                ticket = _a.sent();
                if (ticket)
                    return [2 /*return*/, res.status(200).send({ ticket: ticket })];
                throw new errors_1.NotFoundError();
            case 3:
                e_3 = _a.sent();
                throw new errors_1.NotFoundError();
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/:ticket_id', [
    middlewares_1.currentUser,
    middlewares_1.requireAuth,
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty()
        .withMessage("Title must be provided."),
    (0, express_validator_1.body)('price')
        .not()
        .isEmpty()
        .isInt({ gt: 0 })
        .withMessage("Price above 0 must be provided."),
    middlewares_1.validateRequest
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, _a, title, price, ticket, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ticketId = req.params.ticket_id;
                _a = req.body, title = _a.title, price = _a.price;
                ticket = null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, models_1.Ticket.findById(ticketId)];
            case 2:
                ticket = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_4 = _b.sent();
                throw new errors_1.BadRequest("");
            case 4:
                if (String(ticket.created_by) !== String(req.currentUser.id)) {
                    throw new errors_1.NotAuthorizedError();
                }
                ;
                if (!ticket)
                    throw new errors_1.NotFoundError();
                ticket.set({ title: title, price: price });
                return [4 /*yield*/, ticket.save()];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).send({ ticket: ticket })];
        }
    });
}); });
exports.default = router;
