// controllers/userController.js
const Car = require('../models/Cars'); // Importer le modèle Car

// Créer un nouvel utilisateur
exports.createCar = async (req, res) => {
    const { matricule, modele, couleur, puissance, carburant, anneeModele, kilometrage, dateVidange } = req.body;

    try {
        let car = new Car({
            matricule,
            modele,
            couleur,
            puissance,
            carburant,
            anneeModele,
            kilometrage,
            dateVidange
        });

        await car.save();
        res.status(201).json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Obtenir tous les utilisateurs
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
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
exports.updateCar = async (req, res) => {
    const { matricule, modele, couleur } = req.body;

    try {
        let car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ msg: 'Car not found' });
        }

        car.matricule = matricule || car.matricule;
        car.modele = modele || car.modele;
        car.couleur = couleur || car.couleur;
        // car.isActive = isActive !== undefined ? isActive : car.isActive;

        await car.save();
        res.json(car);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteCar = async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ msg: 'car not found' });
        }

        await Car.findByIdAndDelete(req.params.id);

        res.json({ msg: 'car removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};