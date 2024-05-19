import { Express , Request , Response, Router } from "express";
import IaModelController from "../controller/IaModel.controller";

const router = Router();

router.post("/generate-audio", IaModelController.queryIaModel);
router.get("/health", (req: Request, res: Response) => {
    res.status(200).send("Server is running!");
});


const routes = (app: Express) => {
    app.use("/api/v1",router);
};

export default routes;