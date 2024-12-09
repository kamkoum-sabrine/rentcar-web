// controllers/userController.js
const Client = require('../models/Clients'); // Importer le modèle Car

// Créer un nouvel utilisateur
exports.createClient = async (req, res) => {
    const { prenom, nom, adresse, telephone, ste, dateNaissance, nationalite, cin, dateCin, lieuCin, numPermis, datePermis, lieuPermis } = req.body;

    try {
        let client = new Client({
            prenom, nom, adresse, telephone, ste, dateNaissance, nationalite, cin, dateCin, lieuCin, numPermis, datePermis, lieuPermis
        });

        await client.save();
        res.status(201).json(client); // Retourner l'utilisateur créé
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Obtenir tous les utilisateurs
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
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
exports.updateClient = async (req, res) => {
    const { prenom, nom, adresse, telephone, ste, dateNaissance, nationalite, cin, dateCin, lieuCin, numPermis, datePermis, lieuPermis } = req.body;

    try {
        let client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ msg: 'Client not found' });
        }

        // Mettre à jour les informations utilisateur
        car.prenom = prenom || car.prenom;
        car.nom = nom || car.nom;
        car.adresse = adresse || car.adresse;
        car.telephone = telephone || car.telephone;
        car.ste = ste || car.ste;
        car.dateNaissance = dateNaissance || car.dateNaissance;
        car.nationalite = nationalite || car.nationalite;
        car.cin = cin || car.cin;
        car.dateCin = dateCin || car.dateCin;
        car.lieuCin = lieuCin || car.lieuCin;
        car.numPermis = numPermis || car.numPermis;
        car.datePermis = datePermis || car.datePermis;
        car.lieuPermis = lieuPermis || car.lieuPermis;
        // car.isActive = isActive !== undefined ? isActive : car.isActive;

        await client.save();
        res.json(client);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Supprimer un utilisateur
exports.deleteClient = async (req, res) => {
    try {
        let client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ msg: 'client not found' });
        }

        await Client.findByIdAndDelete(req.params.id);

        res.json({ msg: 'client removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};