const express = require('express');
const router = express.Router();//router permet de faire des routes
const {createUser, login, findAll, deleteUser, updateUser, getPageConnexion, getPageInscription, getPageProfil} = require('../controller/userController');// on importe la fonction create du controller
const ensureToken = require('../config/token')

/*********on crée un dossier route par controllers ********/

router.route('/create').post(createUser)//on demande à router de créer une route, on lui donne le nom que l'on souhaite et on lui indique que c'est une methode post et on lui dit qu'elle fonction on appelle pour cette route
                      
router.route('/login').post(login)

router.route('/findAll').get(findAll)

router.route('/delete/:id').delete(deleteUser)

router.route('/updateUser/:id').post(updateUser)



/*****************ROUTES POUR APPEL DES PAGES***************************/
router.route('/').get(getPageConnexion)
router.route('/inscription').get(getPageInscription)
router.route('/profil').get(getPageProfil)

/*****On pense toujours a exporter router pour le mettre dans l'APP   GO => APP ****/
module.exports= router