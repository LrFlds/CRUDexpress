const express = require('express');
const app = express();
const userRoute= require('./routes/userRoute');//on importe le router du user



/***********CONFIG***********/
app.use(express.json())
app.use(express.urlencoded({extended:true}))




/***********ROUTES***********/
app.use('/user',userRoute)// On crée une route spéciale pour les routes du user donc a chaque fois que l'on appelle une fonction présente dans le user controller on commencera par /user et la route que l'on a donné pour la fonction ex: pour créer un user: Localhost:3001/user/create

module.exports = app;