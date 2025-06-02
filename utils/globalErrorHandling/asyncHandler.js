const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            if (!res.headersSent) {
                next(error);
            }
        });
    };
};

export default asyncHandler;