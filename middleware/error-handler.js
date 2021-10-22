const {CustomAPIError} = require('../errors/custom-error');

const errorHandler = (err, req, res, next) => {
    // checking if error is an instance of Custom Error
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: `Something went wrong pls try again`})
}

module.exports = errorHandler;