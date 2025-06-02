import { findUser } from "../../Auth/repo/authRepo.js";
import { enumRole } from "../../user/model/userModel.js";
import Schedule from "../model/scheduleModel.js";
import { generateWeeklySlots } from "../services/scheduleService.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const setDoctorSchedule = asyncHandler(
    async (req, res, next) => {
        if (!req.user)
            return next(new Error("Unauthorized", { cause: 401 }));

        const doctorId = req.user._id;

        const { workingDays, sessionDuration } = req.body;

        if (!doctorId || !workingDays || !sessionDuration)
            return next(new Error("Missing required fields", { cause: 400 }));

        const slots = await generateWeeklySlots(doctorId, workingDays, sessionDuration);

        if (!slots)
            return next(new Error("Oops something went wrong", { cause: 500 }));

        return res.status(201).json({ message: "success", slots });
    }
);

export const getDoctorSchedule = asyncHandler(
    async (req, res,next) => {
        if (!req.user)
            return next(new Error("Unauthorized", { cause: 401 }));

        const { doctorId } = req.params;

        const findDoctor = await findUser({ payload: { _id: doctorId, role: enumRole.doctor } });

        if (!findDoctor) 
            return next(new Error("Doctor not found", { cause: 404 }));

        const schedule = await Schedule.find({ doctorId });
        
        if (!schedule)
            return next(new Error("Schedule not found", { cause: 404 }));

        return res.status(200).json({ message: "success", schedule });
    }
);
