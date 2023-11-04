import { Request, Response } from "express";
import RepliceService from "../services/RepliceService";

export default new (class RepliceController {
  create(req: Request, res: Response) {
    RepliceService.create(req, res);
  }
  find(req: Request, res: Response) {
    RepliceService.find(req, res);
  }
  update(req: Request, res: Response) {
    RepliceService.update(req, res);
  }
  delete(req: Request, res: Response) {
    RepliceService.delete(req, res);
  }
  detail(req: Request, res: Response) {
    RepliceService.detail(req, res);
  }
})();
