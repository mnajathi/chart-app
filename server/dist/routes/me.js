"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const me_1 = __importDefault(require("../controllers/me"));
const router = express_1.default.Router();
router.get('/', me_1.default.getPosts);
module.exports = router;
//# sourceMappingURL=me.js.map