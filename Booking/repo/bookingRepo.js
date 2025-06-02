import Booking from "../model/bookingModel.js";
import Schedule from "../../Doctor/model/scheduleModel.js";

export const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

export const updateBookingStatus = async (bookingId, status) => {
    return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
};

export const findBookingsByDoctor = async (doctorId) => {
    // return await Booking.find({ doctorId }).populate("patientId", "name email").populate("scheduleId");
    return await Booking.find({ doctorId })
    .populate('patientId', 'firstName lastName email')
    .populate({
        path: 'scheduleId',
        select: 'date slots',
        match: { 'slots._id': { $exists: true } }
    });
};

export const findScheduleById = async (scheduleId) => {
    return await Schedule.findById(scheduleId);
};

export const updateSlotStatus = async (scheduleId, slotId, updates) => {
    return await Schedule.findOneAndUpdate(
        { _id: scheduleId, "slots._id": slotId },
        { $set: { "slots.$.status": updates.status, "slots.$.patientId": updates.patientId, "slots.$.isBooked": updates.isBooked } },
        { new: true }
    );
};

// export const findAvailableSlots = async (doctorId) => {
//     return await Schedule.find({ doctorId,"slots.status": "available" });
// };

export const findAvailableSlots = async (query) => {
    return await Schedule.find(query).select("day date slots").sort({ date: 1 });
};

export const findBookingsByPatient = async (patientId) => {
    return await Booking.find({ patientId }).populate("doctorId", "firstName lastName ").populate("scheduleId");
};

export const hasFutureBooking = async (patientId, doctorId, today) => {
    const bookings = await Booking.find({
        patientId,
        doctorId,
        status: { $in: ["pending", "confirmed"] }
    }).populate("scheduleId", "date");

    return bookings.some(booking => {
        return booking.scheduleId && booking.scheduleId.date >= today;
    });
};