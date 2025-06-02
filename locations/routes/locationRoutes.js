import { Router } from "express";
import * as locationController from "../controllers/locationController.js";
import validation from "../../middlewares/validation.js";
import * as LS from "../service/location.schema.js";

const locationRoutes = Router();

locationRoutes.post("/add", validation(LS.addLocationSchema), locationController.addLocation);
locationRoutes.get("/all", locationController.getLocations);
locationRoutes.delete("/delete/:id", validation(LS.deleteLocationSchema), locationController.deleteLocation);

export default locationRoutes;