const {constants} =  require('../config')
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation failed",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not found",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title:"Internal error",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"unauthroized",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"Forbidden",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
        // case constants.OK:
        //     res.json({title:"Good to go!!!!!",message: err.message, status: statusCode,stackTrace: err.stack});
        //     break;
        case constants.CREATED:
            res.json({title:"Created !!!!!",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
        default:
            res.json({title:"Something went wrong please try again later ",message: err.message, status: statusCode,stackTrace: err.stack});
            break;
    }
    //res.json({title:"Not found",message: err.message, status: 404,stackTrace: err.stack});
};

module.exports = errorHandler;