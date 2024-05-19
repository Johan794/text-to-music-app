import { Request, Response } from "express"
import IaModelService from "../services/IaModel.service"
class IaModelController {
  public async queryIaModel(req: Request, res: Response): Promise<Response> {
    try {
      const { inputs } = req.body
      //console.log(req)
      if (!inputs) {
        return res.status(400).json({ message: "Query is required" })
      }
      const audioUrl = await IaModelService.queryIaModel(inputs)
      return res.status(200).json({ audioUrl })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: e })
    }
  }
}

export default new IaModelController()
