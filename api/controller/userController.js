const User = require("../domain/domainServices/models/userModel")//On import le model pour le controller
const BDD = require('../domain/data/dbConnection');//on importe la bdd
const bcrypt = require('bcrypt');
const ensureToken = require('../config/token')




/***CONTROLLER on pense toujours à exporter ses modules ***/

module.exports = {

// Create Part 
createUser(req, res) {//On crée un fonction create, on instancie la requete et la reponse
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
        } 
        else {
            res.send('Utilisateur déjà connu')// il gére l'erreur si il y a déjà un utilisateur existant avec cette adresse mail
        }/************GO => ROUTES  ***********/
    })
},


login(req, res){
    User.findOne({ Email: req.body.Email }).then(async(user) => {
        if(!user){
            res.send('Utilisateur inconnu')
        }
        else{
            await bcrypt.compare(req.body.Password, user.Password, (err, result)=>{
               if(result == true){
                    const token = jwt.sign({user}, 'MY_SECRET_KEY')
                    res.json({token:token})
               }
               else{
                   res.send('Mot de passe inconnu')
               }
            })
        }
    })
},

// Read Part 
findAll(req, res){
    User.find()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message|| "Erreur lors de la recherche utilisateur"
        })
        
    })

        
    
},

// Delete part 
deleteUser(req, res) {
    User.findOne({ Email: req.body.Email }).then(result => {
        
        if (result == null) {
            res.sendStatus(204)
        } 
        
        else {
            result.remove((err, user) => {
                
                if (err) {
                    res.send(err);
                } 
                
                else {
                    res.sendStatus(200)
                }
            })
        }
    })
},


// Update part
updateUser(req, res){
    User.findOne({Email: req.body.Email}).then( async (user) => {
        if(req.body.Password != null && req.body.NewPassword && req.body.Password !="" && req.body.Password != req.body.NewPassword){
            await bcrypt.compare(req.body.Password, user.Password, (err, match) => {
                if(err){
                    res.send('Mot depasse éronné')
                }else{
                    user.updateOne({Password: req.body.NewPassword}).then().catch(error => {
                        console.log(error)
                    })
                }
            })
        }
        if (req.body.Email != null && req.body.NewEmail != null && req.body.Email != req.body.NewEmail && req.body.NewEmail != ""){
            await bcrypt.compare(req.body.Password, user.Password, (err, match) => {
                if (err) {
                    console.log(err)
                } else {
                    user.updateOne({ Email: req.body.NewMail }).then().catch(error => {
                        console.log(error)
                    })
                }
            })
        }
        if(req.body.Name != null && req.body.NewName != null && req.body.Name != req.body.NewName && req.body.NewName != ""){
            user.updateOne({ Name: req.body.NewName }).then().catch(error => {
                console.log(error)
            })
        }
        if(req.body.FirstName != null && req.body.NewFirstName != null && req.body.FirstName != req.body.NewFirstName && req.body.NewFirstName != ""){
            user.updateOne({ FirstName: req.body.NewFirstName }).then().catch(error => {
                console.log(error)
            })
        }
    })
},

}
