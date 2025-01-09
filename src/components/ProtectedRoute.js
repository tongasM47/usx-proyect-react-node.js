import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user ? children : <Navigate to="/login" />; // Redirige al login si no está autenticado
};

export default ProtectedRoute;
