const mongoose = require('mongoose');
const UserSchema = require('../../schema/userSchema');
const bcrypt = require('bcrypt');

UserSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.Password,salt)
        this.Password = hash 
        next()
    }
    catch(err){
        next(err)
    }
})

/***********Le model permet d'exporter le schema dans la bdd mais aussi aux controllers ************/
const UserModel = mongoose.model('UserModel'/*=>NOM dans la bdd*/, UserSchema);
module.exports = UserModel;

/**GO => CONTROLLER **/