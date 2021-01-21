const User = require("../domain/domainServices/models/userModel")//On import le model pour le controller
const BDD = require('../domain/data/dbConnection');//on importe la bdd




/***CONTROLLER on pense toujours à exporter ses modules ***/

module.exports = {


createUser(req, res) {//On crée un foction create, on instancie la requete et la reponse
    User.findOne({ Email: req.body.Email }).then(result => {//on lui dit de chercher dans les Users si l'email n'existe deja pas dans la bdd
        if (result == null) {//si il ne trouve pas il crée le user
            const newUser = new User({
                Name: req.body.Name,
                FirstName: req.body.FirstName,
                Email: req.body.Email,
                Password: req.body.Password,
            })
            newUser.save((err, user) => {//on lui dit de sauvegarder la const NewUser que l'on vient de créer 
                if (err) {// on lui dit de gérer l'erreur de sauvegarde
                    res.send(err)
                } else {
                    res.sendStatus(201)// si il n'y a pas d'erreur il renvoi le status 201
                }
            })
        } else {
            res.send('Utilisateur déjà connu')// il gére l'erreur si il y a déjà un utilisateur existant avec cette adresse mail
        }/************GO => ROUTES  ***********/
    })
}



}