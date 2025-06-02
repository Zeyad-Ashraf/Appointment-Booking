import asyncHandler from "../utils/globalErrorHandling/asyncHandler.js";

const verifyRole = function(roles){
    return asyncHandler(
        async (req, res, next) => {
            if(!roles.includes(req.user.role)){
                return next(new Error("don't have permission", { cause: 401 }));
            }
            next();
        }
    )
}

export default verifyRole;