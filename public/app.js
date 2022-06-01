"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./routes/auth.router");
const routes_1 = require("./routes/routes");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.set("port", port);
app.use("/", routes_1.router);
app.use("/auth", auth_router_1.authRouter);
app.listen(app.get("port"), () => {
    console.log(`Server Is Working At 💯 Capacity At Port : ${app.get("port")}`);
});
