export const globalErrorHandling = (err, req, res, next) => {
    return res.status(err["cuase"]||500).json({msg:err.message,stack:err.stack});
}