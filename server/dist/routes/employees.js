"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const employees_1 = __importDefault(require("../controllers/employees"));
const router = express_1.default.Router();
router.get('/', employees_1.default.getEmployees);
module.exports = router;
//# sourceMappingURL=employees.js.map