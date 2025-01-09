const Product = require('../models/Product');

// Función para agregar un producto a la base de datos
const addProductToDB = async (productData) => {
    try {
        const product = new Product({
            asin: productData.asin,
            name: productData.name,
            description: productData.description,
            price: productData.price,
            category: productData.category,
            image: productData.image,
            rating: productData.rating,
            reviewCount: productData.reviewCount,
            link: productData.link,
            availability: productData.availability,
            brand: productData.brand,
            dimensions: productData.dimensions,
            weight: productData.weight,
            releaseDate: productData.releaseDate,
            stock: productData.stock,
            onSale: productData.onSale,
        });

        await product.save();
        console.log('Producto agregado a la base de datos:', product);
    } catch (error) {
        console.error('Error al agregar producto:', error);
    }
};

module.exports = { addProductToDB };
