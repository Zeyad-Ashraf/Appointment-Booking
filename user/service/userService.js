


export const getProfile = async (req, res, next) =>{
    if(!req.user) return next(new Error("Unauthorized", { cause: 401 }));

    const user = req.user;

    return res.status(200).json({message: "success", user});
}