const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Conexion a la DB
db.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Error al conectar con PostgreSQL:', err.stack);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

app.get('/', (req, res) => {
    res.send('Servidor del Reto Tecnico funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto: ' + PORT);
});

