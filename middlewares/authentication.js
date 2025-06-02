import asyncHandler from "../utils/globalErrorHandling/asyncHandler.js";
import verifying from "../utils/tokens/veryfing.js";
import { findUser } from "../Auth/repo/authRepo.js";


const authentication = asyncHandler(
    async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) return next(new Error("Unauthorized", { cause: 401 }));
        const decoded = await verifying({ payload: token, SECRET_KEY: process.env.JWT_SECRET });
        const user = await findUser({ payload: {email: decoded.email} });

        if(!user) return next(new Error("Unauthorized", { cause: 401 }));

        req.user = user;
        next();
    }
)

export default authentication;