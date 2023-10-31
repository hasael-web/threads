import { Request, Response } from "express";
import UserService from "../services/UserService";

export default new (class UserController {
  find(req: Request, res: Response) {
    UserService.find(req, res);
  }
  register(req: Request, res: Response) {
    UserService.register(req, res);
  }
  update(req: Request, res: Response) {
    UserService.update(req, res);
  }
  delete(req: Request, res: Response) {
    UserService.delete(req, res);
  }
  login(req: Request, res: Response) {
    UserService.login(req, res);
  }
  logout(req: Request, res: Response) {
    UserService.logout(req, res);
  }
  check(req: Request, res: Response) {
    UserService.chek(req, res);
  }
})();
