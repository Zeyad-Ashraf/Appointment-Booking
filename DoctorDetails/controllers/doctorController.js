import * as doctorService from "../services/doctorService.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const addDoctor = asyncHandler(doctorService.addDoctor);

export const getDoctor = asyncHandler(doctorService.getDoctor);

export const getDoctorprofile = asyncHandler(doctorService.getDoctorprofile);

export const getAllDoctors = asyncHandler(doctorService.getDoctors);

export const deleteDoctor = asyncHandler(doctorService.deleteDoctor);

export const updateDoctor = asyncHandler(doctorService.updateDoctor);