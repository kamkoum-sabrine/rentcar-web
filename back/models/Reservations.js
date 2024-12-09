const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    datDebut: {
        type: Date,
        required: false,
    },
    dateFin: {
        type: Date,
        required: false,
    },
    voiture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car', // Référence vers le modèle Voiture
        required: true
    },
    conducteur1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Référence vers le modèle Voiture
        required: true
    },
    conducteur2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Référence vers le modèle Voiture
        required: false
    },
    prolongation1: {
        type: Date,
        required: false,
    },
    prolongation2: {
        type: Date,
        required: false,
    },
    changementVoiture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car', // Référence vers le modèle Voiture
        required: false
    },
    coutJour: {
        type: Number,
        required: false,
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
