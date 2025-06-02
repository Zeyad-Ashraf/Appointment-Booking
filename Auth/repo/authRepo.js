import {User} from "../../user/model/userModel.js";

export const findUser = async ({payload}) => {
    return await User.findOne(payload);
}

export const findUserById = async (userId) => {
    return await User.findById(userId);
}

export const findUsers = async ({payload , populate = []}) => {
    return await User.find(payload);
}

export const saveUser = async ({ userData }) => {
    const user = new User(userData);
    return await user.save();
}