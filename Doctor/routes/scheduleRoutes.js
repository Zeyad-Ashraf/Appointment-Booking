import express from "express";
import { setDoctorSchedule, getDoctorSchedule } from "../controllers/scheduleController.js";
import { enumRole } from "../../user/model/userModel.js";
import authentication from "../../middlewares/authentication.js";
import verifyRole from "../../middlewares/verifyRole.js";

const router = express.Router();

router.post("/set-schedule", authentication, verifyRole([enumRole.doctor]), setDoctorSchedule); 
router.get("/get-schedule/:doctorId", authentication, getDoctorSchedule);

export default router;
