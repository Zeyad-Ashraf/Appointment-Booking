import * as bookingService from "../services/bookingService.js";
import * as bookingRepo from "../repo/bookingRepo.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const bookSlot = asyncHandler (async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const { scheduleId, slotId , patientId } = req.body;
        const booking = await bookingService.bookSlot(patientId, scheduleId, slotId, next);
        res.status(201).json({ message: "success", data: booking });
});

export const respondToBooking = asyncHandler(async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const { bookingId, accept , doctorId } = req.body; 
        const booking = await bookingService.respondToBooking(bookingId, doctorId, accept, next);
        res.status(200).json({ message: "success", data: booking });
});

export const getDoctorBookings = asyncHandler (async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const doctorId = req.user._id; 
        const bookings = await bookingRepo.findBookingsByDoctor(doctorId);
        res.status(200).json({ message: "success", data: bookings });
});

export const getAvailableSlots = asyncHandler(async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const { doctorId } = req.params;
        if (!doctorId) return next(new Error("Doctor ID is required"));
        const slots = await bookingService.getAvailableSlots(doctorId);
        return res.status(200).json({ success: true, data: slots });
});

export const getPatientBookings = asyncHandler(async (req, res, next) => {
        if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));
        const patientId = req.user._id; 
        const bookings = await bookingRepo.findBookingsByPatient(patientId);
        res.status(200).json({ message: "success", data: bookings });
});