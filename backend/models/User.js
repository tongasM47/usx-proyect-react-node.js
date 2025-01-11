const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }, // Nombre del usuario
        email: { type: String, required: true, unique: true }, // Correo único
        password: { type: String, required: true }, // Contraseña cifrada
    },
    {
        timestamps: true, // Agregar createdAt y updatedAt
    }
);

// Cifrar contraseñas antes de guardar
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
