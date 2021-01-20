const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const dotenvExpand = require('dotenv-expand'); 

const myEnv = dotenv.config();
dotenvExpand(myEnv); 

mongoose.connect(`${process.env.Bdd}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", ()=> {
    console.log("Connection okay"); 
})
.on("error", (error) => {
    console.log("Connection failed" + error); 
}); 