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
        client.prenom = prenom || client.prenom;
        client.nom = nom || client.nom;
        client.adresse = adresse || client.adresse;
        client.telephone = telephone || client.telephone;
        client.ste = ste || client.ste;
        client.dateNaissance = dateNaissance || client.dateNaissance;
        client.nationalite = nationalite || client.nationalite;
        client.cin = cin || client.cin;
        client.dateCin = dateCin || client.dateCin;
        client.lieuCin = lieuCin || client.lieuCin;
        client.numPermis = numPermis || client.numPermis;
        client.datePermis = datePermis || client.datePermis;
        client.lieuPermis = lieuPermis || client.lieuPermis;
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