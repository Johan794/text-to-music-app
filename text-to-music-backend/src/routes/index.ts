import { Express , Request , Response } from "express";
import IaModelController from "../controller/IaModel.controller";
const routes = (app: Express) => {
    //Generate audio
    app.post("/generate-audio", IaModelController.queryIaModel);

  
    
};

export default routes;