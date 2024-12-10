const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    cin: {
        type: String,
        required: true,
        unique: true
    },
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: false,
    },
    adresse: {
        type: String,
        required: false,
    },
    telephone: {
        type: String,
        required: false,
    },
    ste: {
        type: Number,
        required: false,
    },
    dateNaissance: {
        type: Date,
        required: false,
    },
    nationalite: {
        type: String,
        required: false,
    },
    cin: {
        type: String,
        required: true,
        unique: true
    },
    dateCin: {
        type: Date,
        required: false,
    },
    lieuCin: {
        type: String,
        required: false,
    },
    numPermis: {
        type: String,
        required: false,
    },
    datePermis: {
        type: Date,
        required: false,
    }
});

module.exports = mongoose.model('Client', ClientSchema);
