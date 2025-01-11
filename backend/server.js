// Importar dependencias necesarias
const express = require('express'); // Framework para crear el servidor
const dotenv = require('dotenv'); // Manejo de variables de entorno
const cors = require('cors'); // Middleware para habilitar solicitudes cruzadas
const connectDB = require('./config/database'); // Archivo para conectar a MongoDB

// Importar rutas
const productRoutes = require('./routes/productRoutes'); // Rutas para productos
const categoryRoutes = require('./routes/categoryRoutes'); // Rutas para categorías
const userRoutes = require('./routes/userRoutes'); // Rutas para usuarios

// Configuración de variables de entorno
dotenv.config(); // Cargar variables desde el archivo .env

// Conectar a la base de datos
connectDB(); // Ejecutar función para conectar a MongoDB

// Inicializar la aplicación de Express
const app = express();

// Middlewares globales
app.use(express.json()); // Permitir que el servidor maneje datos en formato JSON
app.use(cors()); // Habilitar CORS para aceptar solicitudes desde otros dominios

// Definir las rutas principales de la API
app.use('/api/products', productRoutes); // Rutas para manejar operaciones de productos
app.use('/api/categories', categoryRoutes); // Rutas para manejar operaciones de categorías
app.use('/api/users', userRoutes); // Rutas para manejar operaciones de autenticación de usuarios

// Ruta raíz para verificar el funcionamiento del servidor
app.get('/', (req, res) => {
    res.send('API funcionando correctamente'); // Respuesta simple de texto
});

// Configuración del puerto del servidor
const PORT = process.env.PORT || 5000; // Utilizar el puerto definido en el .env o 5000 por defecto

// Iniciar el servidor y escuchar en el puerto configurado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Mensaje de confirmación en la consola
});
