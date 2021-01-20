const User = require("../domain/domainServices/models/userModel")
const BDD = require('../domain/data/dbConnection');

module.exports = {
createUser(req, res) {
    User.findOne({ Email: req.body.Email }).then(result => {
        if (result == null) {
            const newUser = new User({
                Name: req.body.Name,
                FirstName: req.body.FirstName,
                Email: req.body.Email,
                Password: req.body.Password,
            })
            newUser.save((err, user) => {
                if (err) {
                    res.send(err)
                } else {
                    res.sendStatus(201)
                }
            })
        } else {
            res.send('Utilisateur déjà connu')
        }
    })
}



}