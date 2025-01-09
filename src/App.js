import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile'; // Importar el componente de perfil
import ProtectedRoute from './components/ProtectedRoute'; // Importar el componente de rutas protegidas
import CategoryPage from './pages/CategoryPage/CategoryPage'; // Importar la página de categorías
import CartPage from './pages/CartPage/CartPage'; // Importar la página del carrito
import { CartProvider } from './context/CartContext'; // Importar el proveedor del carrito

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <Header />
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            {/* Ruta protegida para el perfil */}
                            <Route 
                                path="/profile" 
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                } 
                            />
                            {/* Ruta dinámica para categorías */}
                            <Route path="/category/:category" element={<CategoryPage />} />
                            {/* Ruta para el carrito */}
                            <Route path="/cart" element={<CartPage />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
