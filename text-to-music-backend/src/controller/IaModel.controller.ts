import { Request, Response } from "express";
import  IaModelService  from "../services/IaModel.service";
class IaModelController{
    public async queryIaModel(req: Request, res: Response): Promise<Response>{
        try{
            const { query } = req.body;
            if(!query){
                return res.status(400).json({ message: 'Query is required' });
            }
            const audioUrl = await IaModelService.queryIaModel(query);
            return res.status(200).json({ audioUrl });
        }catch(e){
            return res.status(500).json({ message: e });
        }
    }
}

export default new IaModelController();