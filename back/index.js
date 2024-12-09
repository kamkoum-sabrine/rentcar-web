// index.js
const express = require('express');
const connectDB = require('./db');
const carsRoutes = require('./routes/carsRoutes'); // Importer les routes des utilisateurs
const clientsRoutes = require('./routes/clientsRoutes'); // Importer les routes des utilisateurs
const reservationsRoutes = require('./routes/reservationRoutes'); // Importer les routes des utilisateurs
const cors = require('cors');
const app = express();

// Connecter à la base de données MongoDB
connectDB();
app.use(cors());

// Ou restreindre l'accès à une origine spécifique
app.use(cors({
    origin: 'http://localhost:4200',
}));
// Middleware pour analyser les données JSON
app.use(express.json());

// Routes
app.use('/api/cars', carsRoutes); // Définir les routes des utilisateurs
app.use('/api/clients', clientsRoutes); // Définir les routes des utilisateurs
app.use('/api/reservations', reservationsRoutes); // Définir les routes des utilisateurs

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
