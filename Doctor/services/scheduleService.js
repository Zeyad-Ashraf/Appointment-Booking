import { DateTime } from "luxon";
import { delSchedule, setSchedule } from "../repo/scheduling.js";
import { generating } from "./generatingFun.js";

export const generateWeeklySlots = async (doctorId, workingDays, sessionDuration) => {
    const today = DateTime.now().startOf("day");
    const startOfWeek = today.startOf("week"); 
    let availableSlots = [];

    for (const { day, slots } of workingDays) {

        let targetDate = startOfWeek.plus({ days: DateTime.fromFormat(day, "EEEE").weekday - 1 });

        if (targetDate < today) {
            targetDate = targetDate.plus({ days: 7 });
            // continue; 
        }

        const deleteScheduleIfExists = await delSchedule({ payload: { doctorId, date: targetDate.toISODate() } });

        const newSlots = await generating({ DateTime, doctorId, targetDate, slots, day, sessionDuration });
        availableSlots.push(newSlots);
    }

    await setSchedule(availableSlots.flat());

    return availableSlots.flat();
};

// export const generateWeeklySlots = async (doctorId, workingDays, sessionDuration) => {
//     const today = DateTime.now().startOf("day");
//     const startOfWeek = today.startOf("week"); 
//     let schedules = {}; 

//     for (const { day, slots } of workingDays) {
//         let targetDate = startOfWeek.plus({ days: DateTime.fromFormat(day, "EEEE").weekday - 1 });

//         if (targetDate < today) {
//             targetDate = targetDate.plus({ days: 7 });
//             // continue; 
//         }

//         const key = `${doctorId}-${day}-${targetDate.toISODate()}`;

//         if (!schedules[key]) {
//             schedules[key] = {
//                 doctorId,
//                 day,
//                 date: targetDate.toISODate(),
//                 slots: []
//             };
//         }

//         for (const { startTime, endTime } of slots) {
//             let start = targetDate.set({ 
//                 hour: DateTime.fromFormat(startTime, "hh:mm a").hour, 
//                 minute: DateTime.fromFormat(startTime, "hh:mm a").minute 
//             });

//             let end = targetDate.set({ 
//                 hour: DateTime.fromFormat(endTime, "hh:mm a").hour, 
//                 minute: DateTime.fromFormat(endTime, "hh:mm a").minute 
//             });

//             while (start < end) {
//                 let slotEnd = start.plus({ minutes: sessionDuration });

//                 schedules[key].slots.push({
//                     startTime: start.toFormat("hh:mm a"),
//                     endTime: slotEnd.toFormat("hh:mm a"),
//                     isBooked: false
//                 });

//                 start = slotEnd;
//             }
//         }
//     }

    
//     const availableSlots = Object.values(schedules);


//     await setSchedule(availableSlots);
//     return availableSlots;
// };