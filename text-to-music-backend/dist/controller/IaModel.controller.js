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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IaModel_service_1 = __importDefault(require("../services/IaModel.service"));
class IaModelController {
    queryIaModel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { inputs } = req.body;
                //console.log(req)
                if (!inputs) {
                    return res.status(400).json({ message: "Query is required" });
                }
                const audioUrl = yield IaModel_service_1.default.queryIaModel(inputs);
                return res.status(200).json({ audioUrl });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: e });
            }
        });
    }
}
exports.default = new IaModelController();
