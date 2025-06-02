import * as userService from "../service/userService.js";
import {asyncHandler} from "../../utils/Error/asyncHandler.js";

export const getProfile = asyncHandler(userService.getProfile);