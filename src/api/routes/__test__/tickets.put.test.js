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
var constants_1 = require("../../constants");
var constants_2 = require("./constants");
var utils_1 = require("../../../test/utils");
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../../app"));
var mongoose_1 = __importDefault(require("mongoose"));
it('has a put router handler listening at api path/tickets ', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                    .put(constants_1.PATHS.tickets + "/kl")
                    .send("")];
            case 1:
                response = _a.sent();
                expect(response.status).not.toEqual(404);
                return [2 /*return*/];
        }
    });
}); });
it('Returns a 401 if user is not signed in', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                    .put(constants_1.PATHS.tickets + '/l')
                    .send()];
            case 1:
                response = _a.sent();
                expect(response.status).toBe(401);
                return [2 /*return*/];
        }
    });
}); });
it('Returns a 401 if user is does not own ticket', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, cookie2, ticket, response, ticketId, putResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.createUserGetCookie)("email1@gmail.com", constants_2.password, 201)];
            case 1:
                cookie = _a.sent();
                return [4 /*yield*/, (0, utils_1.createUserGetCookie)("email2@gmail.com", constants_2.password, 201)];
            case 2:
                cookie2 = _a.sent();
                ticket = {
                    title: "creates a ticket success",
                    price: 15
                };
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post(constants_1.PATHS.tickets)
                        .set('Cookie', cookie)
                        .send(ticket)];
            case 3:
                response = _a.sent();
                expect(response.status).toBe(201);
                console.warn(response.body);
                ticketId = response.body._id;
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .put(constants_1.PATHS.tickets + '/' + ticketId)
                        .set("Cookie", cookie2)
                        .send({
                        title: "title12",
                        price: 17
                    })];
            case 4:
                putResponse = _a.sent();
                console.error(putResponse.body);
                expect(putResponse.status).toBe(401);
                return [2 /*return*/];
        }
    });
}); });
it('Returns a 400 if no title and price, or price is invalid.', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, ticket, response, ticketId, putResponseNoTitle, putResponseNoPrice, putResponseBadPrice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.createUserGetCookie)("email1@gmail.com", constants_2.password, 201)];
            case 1:
                cookie = _a.sent();
                ticket = {
                    title: "creates a ticket success",
                    price: 15
                };
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post(constants_1.PATHS.tickets)
                        .set('Cookie', cookie)
                        .send(ticket)];
            case 2:
                response = _a.sent();
                expect(response.status).toBe(201);
                ticketId = response.body._id;
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .put(constants_1.PATHS.tickets + '/' + ticketId)
                        .set("Cookie", cookie)
                        .send({
                        price: 17
                    })];
            case 3:
                putResponseNoTitle = _a.sent();
                expect(putResponseNoTitle.status).toBe(400);
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .put(constants_1.PATHS.tickets + '/' + ticketId)
                        .set("Cookie", cookie)
                        .send({
                        title: "Success"
                    })];
            case 4:
                putResponseNoPrice = _a.sent();
                expect(putResponseNoPrice.status).toBe(400);
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .put(constants_1.PATHS.tickets + '/' + ticketId)
                        .set("Cookie", cookie)
                        .send({
                        title: "Success"
                    })];
            case 5:
                putResponseBadPrice = _a.sent();
                expect(putResponseBadPrice.status).toBe(400);
                return [2 /*return*/];
        }
    });
}); });
it('Returns a 404 if ticket is not found', function () { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                    .put(constants_1.PATHS.tickets + mongoose_1.default.Types.ObjectId().toHexString())
                    .send({
                    title: "title",
                    price: 12
                })];
            case 1:
                response = _a.sent();
                expect(response.status).toBe(404);
                return [2 /*return*/];
        }
    });
}); });
it('Successfully updates ticket.', function () { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, ticket, response, ticketId, newPrice, newTitle, putResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, utils_1.createUserGetCookie)("email1@gmail.com", constants_2.password, 201)];
            case 1:
                cookie = _a.sent();
                ticket = {
                    title: "creates a ticket success",
                    price: 15
                };
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .post(constants_1.PATHS.tickets)
                        .set('Cookie', cookie)
                        .send(ticket)];
            case 2:
                response = _a.sent();
                expect(response.status).toBe(201);
                ticketId = response.body._id;
                newPrice = 17;
                newTitle = "new title";
                return [4 /*yield*/, (0, supertest_1.default)(app_1.default)
                        .put(constants_1.PATHS.tickets + '/' + ticketId)
                        .set("Cookie", cookie)
                        .send({
                        title: newTitle,
                        price: newPrice
                    })];
            case 3:
                putResponse = _a.sent();
                console.warn(putResponse.body);
                expect(putResponse.status).toBe(200);
                expect(putResponse.body.ticket.title).toBe(newTitle);
                expect(putResponse.body.ticket.price).toBe(String(newPrice));
                return [2 /*return*/];
        }
    });
}); });
