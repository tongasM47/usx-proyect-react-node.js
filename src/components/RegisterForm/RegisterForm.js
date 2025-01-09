import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './RegisterForm.css';

const RegisterForm = () => {
    const navigate = useNavigate(); // Crear instancia de useNavigate
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(''); // Estado para manejar mensajes del backend

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validación simple de los campos
    const validate = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio.';
        if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio.';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El email es inválido.';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: `${formData.firstName} ${formData.lastName}`, // Combinar nombre y apellido
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('Registro exitoso. Redirigiendo al inicio de sesión...');
                    setTimeout(() => {
                        navigate('/login'); // Redirigir al login después de 2 segundos
                    }, 2000); // Retraso opcional para mostrar el mensaje
                } else {
                    setMessage(data.message || 'Error al registrar el usuario.');
                }
            } catch (error) {
                setMessage('Error al conectar con el servidor.');
            }
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Registro</h2>
            {message && <p className="message">{message}</p>} {/* Mostrar mensaje del backend */}
            <div className="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
                <label>Apellido</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
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
            <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;
