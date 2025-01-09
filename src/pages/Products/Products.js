import React, { useEffect, useState } from 'react';
import './Products.css';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Error al obtener los productos');
                }
                const data = await response.json();

                // Configurar los productos y las categorías dinámicamente
                setProducts(data);
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="products-page">
            <h1 className="products-title">Catálogo de Productos</h1>

            {/* Carrusel de categorías */}
            <CategoryCarousel categories={categories} />

            {/* Carruseles de productos por categoría */}
            {categories.map(category => (
                <div key={category} className="category-section">
                    <a href={`/category/${category}`} className="category-link">
                        <h2 className="category-title">{category}</h2>
                    </a>
                    <ProductCarousel
                        products={products.filter(product => product.category === category)}
                    />
                </div>
            ))}
        </div>
    );
};

export default Products;
