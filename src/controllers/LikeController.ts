import { Request, Response } from "express";
import LikesService from "../services/LikesService";

export default new (class LikeController {
  find(req: Request, res: Response) {
    LikesService.find(req, res);
  }
  create(req: Request, res: Response) {
    LikesService.create(req, res);
  }
  delete(req: Request, res: Response) {
    LikesService.delete;
  }
})();
