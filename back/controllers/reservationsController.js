// controllers/userController.js
const { populate } = require('../models/Cars');
const Reservation = require('../models/Reservations'); // Importer le modèle Car

// Créer un nouvel utilisateur
exports.createReservation = async (req, res) => {
    const { datDebut, dateFin, voiture, conducteur1, conducteur2, prolongation1, prolongation2, changementVoiture, coutJour } = req.body;
    try {
        let reservation = new Reservation({
            datDebut, dateFin, voiture, conducteur1, conducteur2, prolongation1, prolongation2, changementVoiture, coutJour
        });

        await reservation.save();
        res.status(201).json(reservation); // Retourner l'utilisateur créé
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Obtenir tous les utilisateurs
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('voiture').populate('conducteur1').populate('conducteur2');
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Obtenir un utilisateur par ID
/*exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};*/

// Mettre à jour un utilisateur
exports.updateReservations = async (req, res) => {
    const { datDebut, dateFin, voiture, conducteur1, conducteur2, prolongation1, prolongation2, changementVoiture, coutJour } = req.body;

    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        // Mettre à jour les informations utilisateur
        car.dateDebut = dateDebut || car.dateDebut;
        car.dateFin = dateFin || car.dateFin;
        car.voiture = voiture || car.voiture;
        car.conducteur1 = conducteur1 || car.conducteur1;
        car.conducteur2 = conducteur2 || car.conducteur2;
        car.prolongation1 = prolongation1 || car.prolongation1;
        car.prolongation2 = prolongation2 || car.prolongation2;
        car.changementVoiture = changementVoiture || car.changementVoiture;
        car.coutJour = coutJour || car.coutJour;
        // car.isActive = isActive !== undefined ? isActive : car.isActive;

        await reservation.save();
        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Supprimer un utilisateur
exports.deleteReservation = async (req, res) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ msg: 'reservation not found' });
        }

        await Reservation.findByIdAndDelete(req.params.id);

        res.json({ msg: 'reservation removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};