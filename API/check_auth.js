let cfg = require('./config.json')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try{
        req.tableId = jwt.verify(req.headers.jwt, "secret");

        next();
    }
    catch(ex){
        console.log(ex);
        return res.status(401).json({message: "Authentication failed"}); 
    }  
};
