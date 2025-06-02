import * as bookingRepo from "../repo/bookingRepo.js";
import { DateTime } from "luxon";

// export const bookSlot = async (patientId, scheduleId, slotId, next) => {
//     const schedule = await bookingRepo.findScheduleById(scheduleId);
//     if (!schedule) return next(new Error("Schedule not found" , {cause : 404}));

//     const slot = schedule.slots.id(slotId);
//     if (!slot || slot.status !== "available") throw new Error("Slot not available");

//     await bookingRepo.updateSlotStatus(scheduleId, slotId, {
//         status: "pending",
//         patientId,
//         isBooked: true
//     });

//     const booking = await bookingRepo.createBooking({
//         patientId,
//         doctorId: schedule.doctorId,
//         scheduleId,
//         slotId
//     });

//     return booking;
// };

export const bookSlot = async (patientId, scheduleId, slotId ,next) => {
    const schedule = await bookingRepo.findScheduleById(scheduleId);
    if (!schedule) return next(new Error("Schedule not found" , {cause : 404}));

    const today = DateTime.now().startOf("day").toISODate();
    const now = DateTime.now();

    if (schedule.date < today) return next(new Error("Cannot book past appointments" , {cause : 400}));

    const slot = schedule.slots.id(slotId);
    if (!slot || slot.status !== "available") return next(new Error("Slot not available" , {cause : 400}));
    if (schedule.date === today) {
        const slotStartTime = DateTime.fromFormat(`${schedule.date} ${slot.startTime}`, "yyyy-MM-dd hh:mm a");
        if (slotStartTime < now) return next(new Error("Cannot book past time slots" , {cause : 400}));
    }

    const hasFutureBooking = await bookingRepo.hasFutureBooking(patientId, schedule.doctorId, today);
    if (hasFutureBooking) return next(new Error("You already have a pending or confirmed appointment with this doctor", {cause : 400}));

    await bookingRepo.updateSlotStatus(scheduleId, slotId, {
        status: "pending",
        patientId,
        isBooked: true
    });

    const booking = await bookingRepo.createBooking({
        patientId,
        doctorId: schedule.doctorId,
        scheduleId,
        slotId
    });

    return booking;
};

export const respondToBooking = async (bookingId, doctorId, accept, next) => {
    const booking = await bookingRepo.updateBookingStatus(bookingId, accept ? "confirmed" : "rejected");
    if (!booking || booking.doctorId.toString() !== doctorId) return next(new Error("Unauthorized or booking not found" , {cause : 404}))

    const status = accept ? "confirmed" : "available";
    const updates = { status, isBooked: accept, patientId: accept ? booking.patientId : null };
    await bookingRepo.updateSlotStatus(booking.scheduleId, booking.slotId, updates);

    return booking;
};

// export const getAvailableSlots = async (doctorId) => {
//     const schedules = await bookingRepo.findAvailableSlots(doctorId);
//     return schedules.map(schedule => ({
//         scheduleId: schedule._id,
//         day: schedule.day,
//         date: schedule.date,
//         slots: schedule.slots.filter(slot => slot.status === "available")
//     }));
// };

export const getAvailableSlots = async (doctorId) => {
    const today = DateTime.now().startOf("day").toISODate();
    const now = DateTime.now();

    const query = {
        doctorId,
        "slots.status": "available",
        date: { $gte: today }
    };

    const schedules = await bookingRepo.findAvailableSlots(query);
    return schedules
        .map(schedule => {
            let filteredSlots = schedule.slots.filter(slot => slot.status === "available");

            
            if (schedule.date === today) {
                filteredSlots = filteredSlots.filter(slot => {
                    const slotStartTime = DateTime.fromFormat(`${schedule.date} ${slot.startTime}`, "yyyy-MM-dd hh:mm a");
                    return slotStartTime >= now;
                });
            }

            if (filteredSlots.length === 0) return null;
            return {
                scheduleId: schedule._id,
                day: schedule.day,
                date: schedule.date,
                slots: filteredSlots,
            };
        })
        .filter(schedule => schedule !== null);
};