// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController'); // Importer le contrôleur

// Créer un utilisateur
router.get('/getAll/', reservationsController.getReservations);

// Obtenir tous les utilisateurs
router.post('/create/', reservationsController.createReservation);

// Obtenir un utilisateur par ID
//router.get('/:id', carsController.);

// Mettre à jour un utilisateur
router.put('/update/:id', reservationsController.updateReservations);

// Supprimer un utilisateur
router.delete('/delete/:id', reservationsController.deleteReservation);

module.exports = router;
