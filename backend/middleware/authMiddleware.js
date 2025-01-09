const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Asegúrate de que el modelo de usuario esté en esta ruta

// Middleware para proteger rutas
const protect = async (req, res, next) => {
    let token;

    // Verificar si existe el token en los headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extraer el token
            token = req.headers.authorization.split(' ')[1];
            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Obtener el usuario del token y excluir la contraseña
            req.user = await User.findById(decoded.id).select('-password');
            next(); // Continuar con el siguiente middleware o controlador
        } catch (error) {
            console.error('Error en la autenticación:', error);
            res.status(401).json({ message: 'No autorizado, token inválido' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'No autorizado, token no proporcionado' });
    }
};

module.exports = { protect };
