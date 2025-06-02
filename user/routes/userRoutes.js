import { Router } from "express";
import * as userController from "../controllers/userController.js";
import authentication from "../../middlewares/authentication.js";

const userRoutes = Router();

userRoutes.get("/profile", authentication, userController.getProfile);


export default userRoutes;