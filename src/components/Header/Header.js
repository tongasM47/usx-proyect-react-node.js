import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar Link y useNavigate de React Router
import AuthContext from '../../context/AuthContext'; // Importar el contexto de autenticación
import './Header.css';
import logo from '../../assets/images/logo.svg'; // Asegúrate de que el logo esté en esta ruta

const Header = () => {
    const { user, logout } = useContext(AuthContext); // Obtener estado de autenticación
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Llamar la función de cerrar sesión
        navigate('/login'); // Redirigir al login
    };

    return (
        <header className="header">
            <div className="header-container">
                {/* Logo como enlace a Inicio */}
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="USX Tienda Logo" className="logo-image" />
                    </Link>
                </div>

                {/* Barra de búsqueda */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="search-input"
                    />
                    <button className="search-button">🔍</button>
                </div>

                {/* Navegación */}
                <nav className="nav">
                    <ul className="nav-list">
                        <li><Link to="/products">Productos</Link></li>
                        <li><Link to="/about">Nosotros</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                        {user && <li><Link to="/profile">Perfil</Link></li>} {/* Mostrar Perfil si está autenticado */}
                        <li><Link to="/cart">Carrito</Link></li> {/* Agregado enlace al carrito */}
                    </ul>
                </nav>

                {/* Botones de usuario */}
                <div className="user-actions">
                    {user ? (
                        <>
                            <button className="btn logout-btn" onClick={handleLogout}>Cerrar sesión</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn login-btn">Login</Link>
                            <Link to="/register" className="btn register-btn">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
