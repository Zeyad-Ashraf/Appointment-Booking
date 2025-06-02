import * as LocationService from '../service/locationService.js';
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";


export const addLocation = asyncHandler(LocationService.addLocation);
export const getLocations = asyncHandler(LocationService.getLocations);
export const deleteLocation = asyncHandler(LocationService.deleteLocation);