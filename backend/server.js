const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Importar rutas de categorías
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuarios

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Middleware para manejar JSON en solicitudes
app.use(cors()); // Habilitar CORS para solicitudes cruzadas

// Rutas principales
app.use('/api/products', productRoutes); // Rutas de productos
app.use('/api/categories', categoryRoutes); // Rutas de categorías dinámicas
app.use('/api/users', userRoutes); // Rutas de autenticación de usuarios

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
