const jwt = require('jsonwebtoken')
const User = require('../domain/domainServices/models')


function ensureToken(req,res, next){
    const bearerHeader = req.headers["authorization"];
    const bearer = bearerHeader && bearerHeader.split(" ")[1];
        
    if(bearer == null || bearer == 'undefined')
        return res.sendStatus(401);
        jwt.verify(bearer, 'MY_SECRET_KEY', function(err, data){
            
            if(err){
                return res.sendStatus(403);
                
            }
            else {
                req.user = data
                next();
            }

    })
}
module.exports = ensureToken