import React, { useState, useEffect } from 'react';
import './CategoryCarousel.css';

const itemsPerPage = 7; // Número de categorías visibles por vez

const CategoryCarousel = () => {
    const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
    const [startIndex, setStartIndex] = useState(0); // Estado para la posición actual en el carrusel
    const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos

    // Función para obtener las categorías desde el backend
    const fetchCategories = async () => {
        try {
            setLoading(true); // Inicia el estado de carga
            const response = await fetch('http://localhost:5000/api/categories'); // URL del endpoint del backend
            const data = await response.json(); // Convierte la respuesta a JSON
            setCategories(data); // Actualiza las categorías con los datos del backend
        } catch (error) {
            console.error('Error al obtener las categorías:', error); // Maneja errores
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // Llama a la función fetchCategories al cargar el componente
    useEffect(() => {
        fetchCategories();
    }, []);

    // Función para mover al producto anterior
    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? categories.length - itemsPerPage : prevIndex - 1
        );
    };

    // Función para mover al siguiente producto
    const handleNext = () => {
        setStartIndex((prevIndex) =>
            prevIndex + itemsPerPage >= categories.length ? 0 : prevIndex + 1
        );
    };

    // Calcular las categorías visibles
    const visibleCategories = categories.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="category-carousel">
            {loading ? (
                <p>Cargando categorías...</p> // Muestra un mensaje mientras se cargan las categorías
            ) : (
                <>
                    {/* Botón anterior */}
                    <button className="nav-button prev" onClick={handlePrev}>
                        ◀
                    </button>

                    {/* Lista de categorías */}
                    <div className="category-list">
                        {visibleCategories.map((category) => (
                            <div key={category.id} className="category-item">
                                <img
                                    src={category.image || 'https://via.placeholder.com/100'} // Imagen predeterminada si no hay URL
                                    alt={category.name}
                                    className="category-image"
                                />
                                <p className="category-name">{category.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Botón siguiente */}
                    <button className="nav-button next" onClick={handleNext}>
                        ▶
                    </button>

                </>
            )}
        </div>
    );
};

export default CategoryCarousel;
