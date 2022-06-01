"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.get("/", (req, res) => {
    res.send({
        data: "Auth Check LMAO:) "
    });
});
authRouter.get("/SignHere", (req, res) => {
    res.send({
        data: "Why You Want To Sign In ? "
    });
});
