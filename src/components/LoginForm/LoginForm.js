import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    // Estado local para manejar los datos del formulario
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validación de campos
    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email es inválido.';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Datos enviados:', formData);
            // Aquí se conectará con el backend más adelante
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
