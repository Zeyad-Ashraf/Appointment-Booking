import { connectionDB } from "./DB/connectionDb.js";
import passport from "passport";
import './Auth/passport/passport.js';
import globalErrorHandling from "./utils/globalErrorHandling/globalErrorHandling.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from 'express-rate-limit';


const limiter = rateLimit({
    max: 2000,
    windowMs: 60 * 1000, // 1 minute
    message: "Too many requests from this IP, please try again after 1 minute",
    statusCode: 429,
    handler: (req, res,next) => {
        return next(new Error("Too many requests", { cause: 429 }));
    }
});
export const appController = async (app, express) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const corsOptions = {
        origin: [process.env.CLIENT_URL , 'http://localhost:5173' , 'http://localhost:5174' , 'http://localhost:5175'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    app.use(cors(corsOptions));
    app.use(limiter);

    connectionDB();
    app.use(passport.initialize());
    const authRoutes = await import("./Auth/routes/authRoutes.js");
    app.use("/", authRoutes.default);

    const userRoutes = await import("./user/routes/userRoutes.js");
    app.use("/user", userRoutes.default);

    const locationRoutes = await import("./locations/routes/locationRoutes.js");
    app.use("/admin/locations", locationRoutes.default);

    const doctorRoutes = await import("./DoctorDetails/routes/doctorRoutes.js");
    app.use("/doctors", doctorRoutes.default);

    const DoctorSchedule = await import("./Doctor/routes/scheduleRoutes.js");
    app.use("/doctor/schedule", DoctorSchedule.default);

    const BookingRoutes = await import('./Booking/routes/bookingRoutes.js');
    app.use('/booking', BookingRoutes.default)

    app.use("*", (req, res, next) => {
        return next(new Error("Not found", { cause: 404 }));
    });
    app.use(globalErrorHandling);
};

export default appController;