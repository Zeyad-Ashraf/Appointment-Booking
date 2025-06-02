import passport from 'passport';
import signing from "../../utils/tokens/signing.js";
import * as userService from "../service/authService.js";
import asyncHandler from "../../utils/globalErrorHandling/asyncHandler.js";

export const signUp = asyncHandler(userService.signUp);
export const signIn = asyncHandler(userService.signIn);
// export const confirmedEmail = asyncHandler(userService.confirmEmail);
export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', { session: false }, async (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        if (!user._id) {
            return res.status(400).json({ message: "User ID not found" });
        }

        const token = await signing({ payload: { email: user.email, id: user._id }, SECRET_KEY: process.env.JWT_SECRET, expire: { expiresIn: "1d" } });



        res.status(200).json({ message: 'Authentication successful', user , token });
    })(req, res, next);
};
