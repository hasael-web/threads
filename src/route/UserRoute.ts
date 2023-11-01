import { Router } from "express";
import UserController from "../controllers/UserController";
import authUser from "../middlewares/authUser";
import fileUpload from "../middlewares/file-upload";

const router = Router();

router.get("/users", authUser, UserController.find);
router.patch("/user/:id", authUser, UserController.update);
router.delete("/user/:id", authUser, UserController.delete);

router.post("/logout", UserController.logout);
router.post("/user", UserController.register);
router.post("/login", UserController.login);
router.get("/check", authUser, UserController.check);

export default router;
