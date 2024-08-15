// const {constants} = require('../constants');
// const errorHandler= (err,req,res,next)=>{
//      const statusCode =res.statusCode ? res.statusCode : 500; 
//      switch(statusCode){
//         case constants.VALIDATION_ERROR:
//             res.json({title:"Valildation Failed",message : err.message ,stackTrace:err.stack });
//            // break;
//         case constants.NOT_FOUND:
//             res.json({title:"Not Found",message : err.message ,stackTrace:err.stack });
//            // break;
//         case constants.FORBIDDEN:
//             res.json({title:"Forbidden",message : err.message ,stackTrace:err.stack });
//           //  break;
//         case constants.SERVER_ERROR:
//             res.json({title:"Server error",message : err.message ,stackTrace:err.stack });
//            // break;
//         case constants.UNAUTHORIZED:
//             res.json({title:"Un Authorized ",message : err.message ,stackTrace:err.stack });
//           //  break;
//         default:
//                 console.log("NO ERROR !!")
//             break;
//      }
    
   
// };

// module.exports=errorHandler;
const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500;

    // Handle CastError for invalid ObjectId
    // if (err.name === "CastError" && err.kind === "ObjectId") {
    //     statusCode = 404;
    //     err.message = "Contact not found";
    // }

    res.status(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            res.status(500).json({
                title: "Unknown Error",
                message: "An unexpected error occurred.",
                stackTrace: err.stack,
            });
            break;
    }
};

module.exports = errorHandler;

