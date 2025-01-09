# USX Tienda - Proyecto de E-commerce

USX Tienda es un proyecto de e-commerce desarrollado en React con un enfoque en diseño limpio, funcionalidades modernas y adaptabilidad. Este documento detalla el estado actual del proyecto, las características implementadas y los próximos pasos en el desarrollo.

---

## **Estado Actual del Proyecto**
El proyecto cuenta con una estructura bien organizada y funcional que incluye un diseño modular, componentes reutilizables, y funcionalidades clave como carruseles interactivos, autenticación, y un diseño adaptativo para diferentes tamaños de pantalla.

---

## **Características Implementadas**

### **1. Header**
- Logo de la tienda enlazado a la página principal.
- Barra de búsqueda funcional.
- Navegación con enlaces a las páginas: Inicio, Productos, Contacto, Registro e Inicio de sesión.
- Botones:
  - **Login**: Redirige a la página de inicio de sesión.
  - **Register**: Redirige a la página de registro.
  - **Carrito**: Acceso al carrito de compras.
- Diseño responsivo con un ancho máximo de `1200px`.

---

### **2. Carruseles Interactivos**
#### **Carrusel de Categorías**
- Imágenes representativas de cada categoría con títulos descriptivos.
- Navegación lateral con botones (`prev` y `next`).
- Indicadores de posición (dots) en la esquina superior derecha.
- Diseño responsivo para dispositivos móviles.

#### **Carrusel de Productos**
- Tarjetas con:
  - Imagen del producto.
  - Nombre.
  - Breve descripción.
  - Precio.
  - Etiqueta de descuento si aplica.
- Botones de navegación laterales con animaciones al pasar el cursor.
- Transiciones suaves para una mejor experiencia visual.
- Diseño adaptable para diferentes tamaños de pantalla.

---

### **3. Página Principal (Home)**
- Incluye un banner promocional bien centrado.
- Presenta cuatro productos destacados.
- Organización visual limpia y diseño compacto.

---

### **4. Página de Productos**
- Carrusel de categorías funcional.
- Carrusel de productos que permite ver elementos destacados de forma interactiva.
- Preparación para integrarse con una API que proporcionará datos dinámicos.

---

### **5. Autenticación**
- Formularios con validaciones visuales para:
  - Registro: Verifica nombre, email y contraseñas coincidentes.
  - Inicio de sesión: Verifica email y contraseña.
- Diseño consistente y claro.

---

### **6. Diseño Modular y Compacto**
- Estructura organizada con componentes en carpetas individuales (`.js` y `.css`).
- Uso de un contenedor general con un ancho máximo de `1200px`.
- Espaciado interno para mantener una separación visual atractiva.

---

### **7. Responsividad**
- Adaptación total para pantallas pequeñas y medianas:
  - Carruseles ajustados proporcionalmente.
  - Páginas clave reorganizadas para mejorar la experiencia en dispositivos móviles.

---

## **Próximos Pasos**
1. **Conexión Backend-Frontend**:
   - Implementar la API REST con Node.js y MongoDB para manejar usuarios, productos y pedidos.
   - Integrar funcionalidades de autenticación con JWT.
2. **Funcionalidades Avanzadas**:
   - Página de detalles del producto.
   - Implementar un carrito de compras más funcional.
   - Wishlist con notificaciones de descuentos.
   - Historial de compras para usuarios registrados.
   - Sugerencias personalizadas basadas en las búsquedas del usuario.
3. **Mejoras de Diseño**:
   - Agregar animaciones para transiciones suaves.
   - Implementar una barra de progreso en formularios.
   - Configurar la página de error 404.

---

## **Cómo Ejecutar el Proyecto**

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/usuario/usx-tienda.git
Instala las dependencias:

bash
Copiar código
npm install
Inicia el servidor de desarrollo:

bash
Copiar código
npm start
Accede al proyecto:

Abre tu navegador y ve a http://localhost:3000.
Tecnologías Utilizadas
Frontend
React.js
CSS modular y responsivo
Backend (Planeado)
Node.js
MongoDB
Herramientas
Git para control de versiones.
Postman para pruebas de API.
Autor
Gastón Maldonado
Oficial de la Armada Nacional Uruguaya y desarrollador entusiasta.

Contribuciones
Si deseas contribuir al proyecto, ¡eres bienvenido! Crea un issue o pull request en el repositorio.

Licencia
Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.

go
Copiar código

Copia y pega este contenido en el archivo `README.md` de tu proyecto y realiza un commit para guardar los cambios. 😊










