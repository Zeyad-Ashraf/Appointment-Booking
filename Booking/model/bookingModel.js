import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true 
    },
    doctorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", required: true
    },
    scheduleId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule", required: true
    },
    slotId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "rejected"],
        default: "pending" 
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

bookingSchema.index({ patientId: 1, doctorId: 1 });


export default mongoose.model("Booking", bookingSchema);