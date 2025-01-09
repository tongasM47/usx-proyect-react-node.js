import React from 'react';
import './Banner.css';

const Banner = () => {
    console.log('Banner renderizado');
    return (
        <div className="banner-wrapper">
            <section className="banner">
                <div className="banner-content">
                    <h1>Bienvenido a USX Tienda</h1>
                    <p>Encuentra los mejores productos al mejor precio.</p>
                    <button className="banner-button">Descubre más</button>
                </div>
            </section>
        </div>
    );
};

export default Banner;
