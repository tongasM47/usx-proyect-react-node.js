import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard'; // Importar el componente ProductCard
import './ProductCarousel.css';

const ProductCarousel = ({ products }) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5; // Número de productos visibles por vez

    const handlePrev = () => {
        setStartIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, products.length - itemsPerPage) : prevIndex - itemsPerPage
        );
    };

    const handleNext = () => {
        setStartIndex((prevIndex) =>
            prevIndex + itemsPerPage >= products.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const showButtons = products.length > itemsPerPage;

    return (
        <div className="product-carousel">
            {showButtons && (
                <button
                    className="nav-button prev"
                    onClick={handlePrev}
                    aria-label="Anterior"
                >
                    ◀
                </button>
            )}

            <div className="product-list">
                {visibleProducts.map((product) => (
                    <ProductCard key={product.asin} product={product} /> // Usar ProductCard
                ))}
            </div>

            {showButtons && (
                <button
                    className="nav-button next"
                    onClick={handleNext}
                    aria-label="Siguiente"
                >
                    ▶
                </button>
            )}
            
        </div>
    );
};

export default ProductCarousel;
