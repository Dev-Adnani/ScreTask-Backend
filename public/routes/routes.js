"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    res.send({
        data: "Why"
    });
});
router.get("/idk", (req, res) => {
    res.send({
        data: "Random!"
    });
});
router.get("/profile", (req, res) => {
    res.send({
        username: "WhySoSerious?"
    });
});
