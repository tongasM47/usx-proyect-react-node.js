import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // Para mensajes de error o éxito

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Inicio de sesión exitoso. Redirigiendo...');
                localStorage.setItem('userInfo', JSON.stringify(data)); // Guardar en localStorage
                setTimeout(() => {
                    navigate('/'); // Redirigir a la página principal
                }, 2000);
            } else {
                setMessage(data.message || 'Error al iniciar sesión.');
            }
        } catch (error) {
            setMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {message && <p className="message">{message}</p>}
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label>Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Iniciar Sesión</button>
        </form>
    );
};

export default LoginForm;
