const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const dotenvExpand = require('dotenv-expand'); 



/****************CONFIG DOTENV********************/ 
const myEnv = dotenv.config();
dotenvExpand(myEnv); 
/*on utilise les config de dotenv que l'on stock dans une variable, et on utilise la fonction dotenvExpand pour l'initialiser */

/**************CONFIG DE LA BDD*******************/
mongoose.connect(`${process.env.Bdd}`, { useNewUrlParser: true, useUnifiedTopology: true });
/*Données sensibles, mot de passe bdd, user dans le dotenv  */


mongoose.connection.once("open", ()=> {//On demande a mongoose de ce connecter, avec l'initialisation open 
    console.log("Connection okay"); // si il est connecté il nous dit okay
})
.on("error", (error) => {//On gére l'erreur de connection 
    console.log("Connection failed" + error); //si il y a une erreur il nous dit connection failed + l'erreur mongoose
}); 



//on enchaine avec les schémas => GO Schema