"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-safe/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const constants_1 = require("./constants");
const employees_1 = __importDefault(require("./routes/employees"));
const me_1 = __importDefault(require("./routes/me"));
dotenv_safe_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/employees', employees_1.default);
app.use('/api/me', me_1.default);
app.get('/', (_, res) => {
    res.send('Prodoscore API By Najathi');
});
app.listen(constants_1.__port__, () => {
    console.log(`🚀 Server ready and listening at ==> http://localhost:${constants_1.__port__}`);
});
//# sourceMappingURL=index.js.map