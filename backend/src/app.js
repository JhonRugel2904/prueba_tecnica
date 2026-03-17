const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

db.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Error al conectar con PostgreSQL:', err.stack);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

