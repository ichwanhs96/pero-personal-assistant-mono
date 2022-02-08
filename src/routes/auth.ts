import { Router } from "express";
import AuthController from "../controllers/auth";
import { checkJwt } from "../middlewares/check_jwt";

const router = Router();
//Login route
router.post("/login", AuthController.login);

//Change user password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;