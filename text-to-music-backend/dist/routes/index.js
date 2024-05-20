"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IaModel_controller_1 = __importDefault(require("../controller/IaModel.controller"));
const router = (0, express_1.Router)();
const routes = (app) => {
    app.use("/api/v1", router);
    app.post("/api/v1/generate-audio", IaModel_controller_1.default.queryIaModel);
    app.get("/api/v1/health", (req, res) => {
        res.status(200).send("Server is running!");
    });
};
exports.default = routes;
