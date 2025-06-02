

export const generating = async ({ DateTime, doctorId, targetDate, slots, day, sessionDuration }) => {

    let schedules = {}; 

    const key = `${doctorId}-${day}-${targetDate.toISODate()}`;

    if (!schedules[key]) {
        schedules[key] = {
            doctorId,
            day,
            date: targetDate.toISODate(),
            slots: []
        };
    }

    for (const { startTime, endTime } of slots) {
        let start = targetDate.set({ 
            hour: DateTime.fromFormat(startTime, "hh:mm a").hour, 
            minute: DateTime.fromFormat(startTime, "hh:mm a").minute 
        });

        let end = targetDate.set({ 
            hour: DateTime.fromFormat(endTime, "hh:mm a").hour, 
            minute: DateTime.fromFormat(endTime, "hh:mm a").minute 
        });

        while (start < end) {
            let slotEnd = start.plus({ minutes: sessionDuration });

            schedules[key].slots.push({
                startTime: start.toFormat("hh:mm a"),
                endTime: slotEnd.toFormat("hh:mm a"),
                isBooked: false
            });

            start = slotEnd;
        }
    }
    return Object.values(schedules);
}