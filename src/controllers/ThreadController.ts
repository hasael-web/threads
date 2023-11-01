import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";

export default new (class ThreadController {
  create(req: Request, res: Response) {
    ThreadService.create(req, res);
  }
  find(req: Request, res: Response) {
    ThreadService.find(req, res);
  }
  update(req: Request, res: Response) {
    ThreadService.update(req, res);
  }
  delete(req: Request, res: Response) {
    ThreadService.delete(req, res);
  }
  detail(req: Request, res: Response) {
    ThreadService.detail(req, res);
  }
})();
