import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import './Home.css'; // Importa los estilos específicos para la página Home
import Banner from '../../components/Banner/Banner'; // Importa el componente Banner desde su ruta correspondiente

// Componente funcional Home
const Home = () => {
    // Estado para almacenar los productos destacados
    const [featuredProducts, setFeaturedProducts] = useState([]);
    // Estado para manejar si los productos aún están cargándose
    const [loading, setLoading] = useState(true);
    // Estado para manejar errores en la obtención de datos
    const [error, setError] = useState(null);

    // useEffect se ejecuta cuando el componente se monta por primera vez
    useEffect(() => {
        // Función para obtener los productos destacados desde el backend
        const fetchFeaturedProducts = async () => {
            try {
                // Realiza una solicitud GET al endpoint para productos destacados
                const response = await fetch('http://localhost:5000/api/products/featured');
                
                // Si la respuesta no es correcta, lanza un error
                if (!response.ok) {
                    throw new Error('Error al obtener productos destacados');
                }
                
                // Convierte la respuesta en formato JSON
                const data = await response.json();
                // Almacena los productos en el estado
                setFeaturedProducts(data);
            } catch (err) {
                // Si ocurre un error, almacena el mensaje en el estado de error
                setError(err.message);
            } finally {
                // Independientemente del resultado, marca la carga como completada
                setLoading(false);
            }
        };

        // Llama a la función para obtener los productos
        fetchFeaturedProducts();
    }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

    // Si los datos aún se están cargando, muestra un mensaje de carga
    if (loading) return <p>Cargando productos destacados...</p>;
    // Si hay un error, muestra el mensaje de error
    if (error) return <p>Error: {error}</p>;

    // Renderiza el contenido principal de la página
    return (
        <div className="home">
            <main className="home-content">
                {/* Renderiza el componente Banner */}
                <Banner />
                {/* Sección para mostrar productos destacados */}
                <section className="home-featured">
                    <h2>Productos Destacados</h2>
                    {/* Grilla para mostrar cada producto destacado */}
                    <div className="featured-grid">
                        {featuredProducts.map((product) => (
                            // Mapea los productos destacados y crea una tarjeta para cada uno
                            <div key={product.asin} className="product-card">
                                {/* Imagen del producto */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                                {/* Nombre del producto */}
                                <h3>{product.name}</h3>
                                {/* Precio del producto */}
                                <p>Precio: ${product.price}</p>
                                {/* Descripción del producto */}
                                <p>{product.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

// Exporta el componente para que pueda ser usado en otros archivos
export default Home;
