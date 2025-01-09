import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext'; // Importar el contexto de autenticación
import './Profile.css';

const Profile = () => {
    const { user } = useContext(AuthContext); // Obtener datos del usuario desde el contexto
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false); // Modo de edición
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    // Obtener datos del usuario desde el backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserData(data);
                    setFormData({ name: data.name, email: data.email });
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        if (user) fetchUserData();
    }, [user]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar envío del formulario para actualizar datos
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setUserData(data);
                setEditMode(false); // Salir del modo de edición
            } else {
                console.error('Error al actualizar los datos del usuario:', data.message);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    return (
        <div className="profile-page">
            <h2>Perfil del Usuario</h2>
            {userData ? (
                <>
                    {editMode ? (
                        <form className="profile-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Guardar Cambios</button>
                            <button type="button" onClick={() => setEditMode(false)}>
                                Cancelar
                            </button>
                        </form>
                    ) : (
                        <div className="profile-info">
                            <p><strong>Nombre:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <button onClick={() => setEditMode(true)}>Editar Perfil</button>
                        </div>
                    )}
                </>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
};

export default Profile;
