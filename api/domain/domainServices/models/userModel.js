const mongoose = require('mongoose');
const UserSchema = require('../../schema/userSchema');



/***********Le model permet d'exporter le schema dans la bdd mais aussi aux controllers ************/
const UserModel = mongoose.model('UserModel'/*=>NOM dans la bdd*/, UserSchema);
module.exports = UserModel;

/**GO => CONTROLLER **/