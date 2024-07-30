const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validationToken = asyncHandler(async (req, res,next) => {
let token;
let authHeader = req.headers.Authorization || req.headers.authorization;
if(!authHeader){
    res.status(401);
    throw new Error("User is not authrozied or token is missing in the request");
}
console.log(authHeader);
if(authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,decode)=>{
        if(err){
            res.status(401);
            throw new Error("User is unauthrozied");
        }
       req.user = decode.user;
       next();
    });

}
});

module.exports = validationToken;