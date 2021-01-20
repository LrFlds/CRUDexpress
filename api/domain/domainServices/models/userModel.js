const mongoose = require('mongoose');
const UserSchema = require('../../schema/userSchema');


const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;