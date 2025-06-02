import { Location } from '../model/locationModel.js';



export const addLocation = async ({name}) => {
    const location = new Location({ name });
    return await location.save();
}

export const findLocation = async ({name}) => {
    return await Location.findOne({ name });
}

export const getAllLocations = async () => {
    return await Location.find();
}

export const findAndDeleteLocation = async ({id}) => {
    return await Location.findOneAndDelete({ _id: id });
}