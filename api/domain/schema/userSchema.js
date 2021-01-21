const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/****on require mongoose et on lui dit que l'on va utiliser ses schemas ****/



/*********On donne la forme du user, les champs que l'on souhaite y trouver **************/

const UserSchema = new Schema({
    Name: { type: String, required: true },
    FirstName: { type: String, required: true },
    Email: { type: String, required: [true, "Email obligatoire"], unique: [true, "Mail déjà existant ..."], match: /^[a-zA-Z0-9._-][^<§!:/;,\|()"#`~&=+%µ*$£%>]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/ },
    Password: { type: String, match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,})$/ },
})



/*******On exporte la constante UserShema ******/
module.exports = UserSchema;

/*******On réalise les models GO => MODELS*********/