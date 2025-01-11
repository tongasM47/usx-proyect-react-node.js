const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController'); // Importar el controlador
const { protect } = require('../middleware/authMiddleware'); // Middleware de protección
const router = express.Router();

// Rutas
router.post('/register', registerUser); // Registro de usuario
router.post('/login', loginUser); // Inicio de sesión

module.exports = router;
