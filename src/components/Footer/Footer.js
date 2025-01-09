import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Información básica */}
                <div className="footer-info">
                    <h4>USX Tienda</h4>
                    <p>Los mejores productos a tu alcance.</p>
                </div>

                {/* Enlaces útiles */}
                <div className="footer-links">
                    <h4>Enlaces</h4>
                    <ul>
                        <li><a href="/about">Nosotros</a></li>
                        <li><a href="/contact">Contacto</a></li>
                        <li><a href="/privacy">Política de privacidad</a></li>
                        <li><a href="/terms">Términos de uso</a></li>
                    </ul>
                </div>

                {/* Redes sociales */}
                <div className="footer-socials">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">📘</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">📷</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 USX Tienda. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
