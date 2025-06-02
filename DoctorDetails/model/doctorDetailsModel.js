import mongoose from "mongoose";


const doctorDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    speciality: {
        type: String,
        required: true,
        index: true
    },
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Location',
        required:true
    },
    address:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    fees : {
        type:Number,
        required:true
    },
    aboutDoctor:{
        type:String,
        required:true
    },
    image:{
        secure_url: String,
        public_id: String
    }
});

doctorDetailsSchema.index({ speciality: 1, location: 1 });


export const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema);