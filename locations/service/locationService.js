import * as LocationRepo from '../repository/locationRepo.js';



export const addLocation = async (req, res, next) => {
    
    const { name } = req.body;

    const findLocation = await LocationRepo.findLocation({name:name.toUpperCase()});

    if (findLocation)
        return next(new Error('Location already exists', { cause: 400 }));

    const newLocation = await LocationRepo.addLocation({ name:name.toUpperCase() });

    res.status(201).json({ msg: "done" });

}


export const getLocations = async (req, res, next) => {

    const findLocation = await LocationRepo.getAllLocations();

    if (!findLocation)
        return next(new Error('no locations yet', { cause: 400 }));

    res.status(201).json({ locations: findLocation });

}


export const deleteLocation = async (req, res, next) => {
    
    const { id } = req.params;

    const deleteLocation = await LocationRepo.findAndDeleteLocation({ id });

    if (!deleteLocation)
        return next(new Error('Location not found', { cause: 400 }));

    res.status(200).json({ msg: "done" });
}