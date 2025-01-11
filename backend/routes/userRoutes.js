const express = require('express');
const { registerUser } = require('../controllers/userController'); // Usar el controlador
const { protect } = require('../middleware/authMiddleware'); // Middleware de protección
const router = express.Router();

// Rutas
router.post('/register', registerUser); // Registro de usuario

module.exports = router;
