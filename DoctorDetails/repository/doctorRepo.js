import { enumRole, User } from "../../user/model/userModel.js";
import { DoctorDetails } from "../model/doctorDetailsModel.js";

export const addDoctorDetails = async ({ data }) => {
    const doctorDetails = new DoctorDetails(data);
    return await doctorDetails.save();
}

export const deleteDoc = async ({ payload }) => {
    return await User.deleteOne(payload);
}

export const findUsers = async ({reqQuery}) => {
    return await DoctorDetails.find(reqQuery).populate({
        path: "userId"
    }).populate({
        path : "location"
    });
}

export const findDoctor = async ({payload = {}}) => {
    return await DoctorDetails.find(payload).populate({
        path: "userId"
    });
}

export const updateDoctorDetails = async ({ user, payload }) => {
    return await DoctorDetails.updateOne(user, payload);
}