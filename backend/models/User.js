const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del usuario
    email: { type: String, required: true, unique: true }, // Correo electrónico único
    password: { type: String, required: true }, // Contraseña encriptada
}, {
    timestamps: true, // Agrega campos de `createdAt` y `updatedAt`
});

// Middleware para encriptar contraseñas antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
