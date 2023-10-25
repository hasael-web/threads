import { Request, Response } from "express";
import FollowingService from "../services/FollowingService";

export default new (class FollowingController {
  create(req: Request, res: Response) {
    FollowingService.create(req, res);
  }
  delete(req: Request, res: Response) {
    FollowingService.delete(req, res);
  }
  find(req: Request, res: Response) {
    FollowingService.find(req, res);
  }
})();
