import { Request, Response } from "express";
import ThreadService from "../services/ThreadService";

export default new (class ThreadController {
  create(req: Request, res: Response) {
    ThreadService.create(req, res);
  }
  find(req: Request, res: Response) {
    ThreadService.find(req, res);
  }
})();
