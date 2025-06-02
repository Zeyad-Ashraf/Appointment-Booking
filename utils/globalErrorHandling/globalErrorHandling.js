

const globalErrorHandling = (err, req, res, next) => {
    if (err) {
        console.log({message: err.message, stack: err.stack});
    }
    return res.status(err["cause"] || 500).json({ message: err.message});
}

export default globalErrorHandling;