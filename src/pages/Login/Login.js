import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir tras el inicio de sesión
import AuthContext from '../../context/AuthContext'; // Importar contexto de autenticación
import './Login.css';

const Login = () => {
    const navigate = useNavigate(); // Instancia para redirigir
    const { login } = useContext(AuthContext); // Obtener la función login del contexto
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState(''); // Para manejar mensajes de éxito/error

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el envío del formulario
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
                login(data.token); // Actualizar el estado global con el token
                setMessage('Inicio de sesión exitoso. Redirigiendo...');
                setTimeout(() => {
                    navigate('/'); // Redirige a la página principal o perfil
                }, 2000); // Retraso opcional
            } else {
                setMessage(data.message || 'Error al iniciar sesión.');
            }
        } catch (error) {
            setMessage('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="login-page">
            <h2>Inicio de Sesión</h2>
            {message && <p className="message">{message}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
