import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import authentication from "../../middlewares/authentication.js";
import verifyRole from "../../middlewares/verifyRole.js";
import { enumRole } from "../../user/model/userModel.js";


const router = express.Router();

//get available slots for a doctor
router.get("/slots/:doctorId", authentication, verifyRole([enumRole.patient]), bookingController.getAvailableSlots);

router.get("/mybookings", authentication, verifyRole([enumRole.patient]), bookingController.getPatientBookings);

//book a slot
router.post("/book", authentication, verifyRole([enumRole.patient]), bookingController.bookSlot);

//respond to booking request
router.put("/respond", authentication,verifyRole([enumRole.doctor]), bookingController.respondToBooking);

//get bookings for a doctor
router.get("/bookings", authentication, verifyRole([enumRole.doctor]), bookingController.getDoctorBookings);

export default router;