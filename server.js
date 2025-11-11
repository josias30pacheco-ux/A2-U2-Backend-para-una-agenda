const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactsRoutes = require('./routes/contacts');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/contacts', contactsRoutes);

app.get('/', (req, res) => {
    res.send('API del Directorio Personal funcionando ✅');
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
