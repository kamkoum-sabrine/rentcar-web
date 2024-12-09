// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController'); // Importer le contrôleur

// Créer un utilisateur
router.get('/getAll/', clientsController.getClients);

// Obtenir tous les utilisateurs
router.post('/create/', clientsController.createClient);

// Obtenir un utilisateur par ID
//router.get('/:id', carsController.);

// Mettre à jour un utilisateur
router.put('/update/:id', clientsController.updateClient);

// Supprimer un utilisateur
router.delete('/delete/:id', clientsController.deleteClient);

module.exports = router;
