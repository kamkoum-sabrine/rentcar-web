const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    matricule: {
        type: String,
        required: true,
        unique: true
    },
    modele: {
        type: String,
        required: true,
    },
    couleur: {
        type: String,
        required: false,
    },
    puissance: {
        type: String,
        required: false,
    },
    carburant: {
        type: String,
        required: false,
    },
    anneeModele: {
        type: Number,
        required: false,
    },
    kilometrage: {
        type: Number,
        required: false,
    },
    dateVidange: {
        type: Date,
        required: false,
    }
});

module.exports = mongoose.model('Car', CarSchema);
