import { Express, Request, Response, Router } from "express"
import IaModelController from "../controller/IaModel.controller"

const router = Router()

const routes = (app: Express) => {
  app.use("/api/v1", router)
  app.post("/api/v1/generate-audio", IaModelController.queryIaModel)
  app.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(200).send("Server is running!")
  })
}

export default routes
