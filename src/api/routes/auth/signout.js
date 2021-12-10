"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// @route POST 
// @desc sign out a user
// @access public
router.post('/', function (req, res) {
    req.session = null;
    res.status(200).send({});
    return;
});
// @route GET
// @desc Sign out a user
// @access public
router.get('/', function (req, res) {
    req.session = null;
    res.status(200).send({});
    return;
});
exports.default = router;
