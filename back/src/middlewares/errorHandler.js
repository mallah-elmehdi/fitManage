import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const errorHandler = async (err, req, res, next) => {
    try {
        console.log('err', err);
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'ERROR FROM THE HANDLER :' + err.message,
            err: err.stack,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            err: error.stack,
        });
    }
};

export default { errorHandler };
