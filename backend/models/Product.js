const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    asin: { type: String, required: true, unique: true },  // ASIN (ID del producto)
    name: { type: String, required: true },  // Nombre del producto
    description: { type: String },  // Descripción del producto
    price: { type: Number, required: true },  // Precio del producto
    category: { type: String, required: true },  // Categoría del producto
    image: { type: String },  // URL de la imagen del producto
    rating: { type: Number, default: 0 },  // Calificación del producto
    reviewCount: { type: Number, default: 0 },  // Número de reseñas
    link: { type: String },  // Enlace de compra en Amazon
    availability: { type: Boolean, default: true },  // Disponibilidad del producto
    brand: { type: String },  // Marca del producto
    dimensions: { type: String },  // Dimensiones del producto
    weight: { type: String },  // Peso del producto
    releaseDate: { type: Date },  // Fecha de lanzamiento (si aplica)
    stock: { type: Number, default: 0 },  // Número de unidades disponibles
    onSale: { type: Boolean, default: false },  // Si el producto está en oferta
}, {
    timestamps: true,  // Registra la fecha de creación y modificación del producto
});

// Middleware para asignar una imagen predeterminada si no se proporciona
productSchema.pre('save', function (next) {
    if (!this.image) {
        this.image = 'https://via.placeholder.com/150'; // URL de la imagen predeterminada
    }
    next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
