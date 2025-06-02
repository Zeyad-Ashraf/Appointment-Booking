import hashed from "../../utils/encrypting/hashing.js";
import comparePassword from "../../utils/encrypting/comparing.js";
// import eventEmitter from "../../utils/emailEvents/index.js";
import signing from "../../utils/tokens/signing.js";
import { findUser, saveUser } from "../repo/authRepo.js";
import { User} from "../../user/model/userModel.js";

export const signUp = async (req, res, next) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await findUser({ payload: { $or: [{ email }, { userName }] } });
    if (user)
        return next(new Error("user already exists", { cause: 400 }));
    const hashedPassword = await hashed(password);
    const addUser = new User({ firstName, lastName, userName, email, password: hashedPassword });
    // const token = await signing({ payload: { email: addUser.email, id: addUser._id}, SECRET_KEY: process.env.JWT_SECRET, expire: { expiresIn: "1d" } });
    
    // eventEmitter.emit("confrimEmail", { email, token });
    const newUser = await saveUser({ userData: addUser });
    return res.status(200).json({message:"success"});
}

// export const confirmEmail = async (req, res, next) => {
//     const { id } = req.params;
//     console.log(id);
//     const decoded = jwt.verify(id, process.env.JWT_SECRET_SIGNUP);
//     if (!decoded?.id)
//         return next(new Error("invalid token", { cause: 400 }));
//     const user = await findUser({ payload: { _id: decoded.id, confirmed: false } });
//     if (!user)
//         return next(new Error("user not found or already confirmed", { cause: 400 }));
//     user.confirmed = true;
//     const newUser = await saveUser({ userData: user });
//     return res.status(200).json({ msg: "email confirmed successfully" });
// }


export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await findUser({ payload: { email } });
    if (!user)
        return next(new Error("invalid Email or password", { cause: 400 }));
    const isPasswordMatch = await comparePassword({ key: password, hashed: user.password });
    if (!isPasswordMatch)
        return next(new Error("invalid Email or password", { cause: 400 }));
    const token = await signing({ payload: { email: user.email, id: user._id }, SECRET_KEY: process.env.JWT_SECRET, expire: { expiresIn: "1d" } });
    
    // return res.status(200).json({ message: "success", token, role: user.role });
    return res.status(200).json({ 
        message: "success", 
        token, 
        role: user.role,
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
}