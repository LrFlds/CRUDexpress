const jwt = require('jsonwebtoken')
const User = require('../domain/domainServices/models/userModel')


function ensureToken(req,res, next){
    const bearerHeader = req.headers["authorization"];//on lui demande de regarder dans les autorization headers
    const bearer = bearerHeader && bearerHeader.split(" ")[1];//on split l'espace qu'il y a entre le bearer et le token, et on lui dit qu'il nous garde le 2em objet donc le token en index 1
        
    if(bearer == null || bearer == 'undefined') {
        res.status(401).send('erreur de Login')
    }else {
        jwt.verify(bearer, 'MY_SECRET_KEY', function(err, data){
            if(err){
                res.status(403).send('token non valide !')              
            }
            else {
                req.user = data
                next();
            }

    })
}
}
module.exports = ensureToken