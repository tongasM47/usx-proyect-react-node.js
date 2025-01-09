import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
    const { category } = useParams(); // Obtener la categoría de la URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
                const data = await response.json();
                if (response.ok) {
                    setProducts(data); // Guardar los productos en el estado
                } else {
                    console.error('Error al obtener los productos:', data.message);
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
            } finally {
                setLoading(false); // Finalizar la carga
            }
        };

        fetchProducts();
    }, [category]); // Ejecutar cuando cambie la categoría

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    return (
        <div className="category-page">
            <h1>Productos de la categoría: {category}</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.price} USD</p>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
