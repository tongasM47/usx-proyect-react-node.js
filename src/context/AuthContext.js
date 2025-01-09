import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Cargar el estado de autenticación desde el localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token }); // Puedes expandir esto con datos adicionales del usuario
        }
    }, []);

    // Función para manejar el login
    const login = (token) => {
        localStorage.setItem('token', token); // Guardar el token en localStorage
        setUser({ token }); // Actualizar el estado del usuario
    };

    // Función para manejar el logout
    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        setUser(null); // Reiniciar el estado del usuario
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
