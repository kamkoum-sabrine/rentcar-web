// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController'); // Importer le contrôleur

// Créer un utilisateur
router.get('/getAll/', carsController.getCars);

// Obtenir tous les utilisateurs
router.post('/create/', carsController.createCar);

// Obtenir un utilisateur par ID
//router.get('/:id', carsController.);

// Mettre à jour un utilisateur
router.put('/update/:id', carsController.updateCar);

// Supprimer un utilisateur
router.delete('/delete/:id', carsController.deleteCar);

module.exports = router;
