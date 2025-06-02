import mongoose from 'mongoose';
import { DoctorDetails } from '../../DoctorDetails/model/doctorDetailsModel.js';


export const enumRole = {
    patient: 'patient',
    doctor: 'doctor',
    admin: 'admin'
}
export const enumStatus = {
    binding: 'binding',
    aproved: 'aproved',
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be at least 3 characters long"],
        maxlength: [15, "First name must be at most 20 characters long"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must be at least 3 characters long"],
        maxlength: [15, "Last name must be at most 20 characters long"]
    },
    userName: {
        type: String,
        required: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [25, "Username must be at most 25 characters long"],
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        unique: true,
        sparse: true,
        minlength: [8, "Password must be at least 8 characters long"],
    },

    googleId : {
        type: String,
        required: false,
        unique: true
    },

    role: {
        type: String,
        enum: Object.values(enumRole),
        default: enumRole.patient
    },
    phone: {
        type: String,
        match: [/^01[0125][0-9]{8}$/, 'Please enter a valid phone number']
    },
    status: {
        type: String,
        enum: Object.values(enumStatus)
    },
    // confirmed: {
    //     type: Boolean,
    //     default: false
    // }
});

userSchema.pre('deleteOne', { document: false, query: true }, async function (next) {

    const user = await this.model.findOne(this.getQuery());

    if (user?.role === enumRole.doctor) {
        await DoctorDetails.deleteOne({ userId: user._id });
    }

    next();
});

export const User = mongoose.model('User', userSchema);