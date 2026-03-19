import { useEffect, useState } from 'react';
import { getProducts } from './services/productService';
import { getCartItems, removeFromCart } from './services/cartService'; 
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer'; 
import { ShoppingCart } from 'lucide-react'; 
import Swal from 'sweetalert2'; 

function App() {
  // Variable del estado principal
  const [productos, setProductos] = useState([]); // Guarda el catalogo completo
  const [cargando, setCargando] = useState(true); // Controla la pantalla de carga inical
  
  // Variable de control del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Guarda lo que trae de la DB

  // Carga el catalogo por primera vez cuando se abre la pagina
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProducts();
        setProductos(data);
      } catch (error) {
        console.error("Hubo un error al cargar la app:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarProductos();
  }, []);

  // Abre el panel lateral y consulta la DB para traer los items actualizados
  const handleOpenCart = async () => {
    setIsCartOpen(true);
    try {
      const data = await getCartItems();
      // Saca el arreglo productos del backend
      setCartItems(data.productos || []); 
      
    } catch (error) {
      console.error("Error al cargar los items del carrito", error);
    }
  };

  // Elimina un producto de la DB y de la pantalla
  const handleRemoveItem = async (idDetalle) => {
    try {
      // Borra en la DB
      await removeFromCart(idDetalle);
      
      // Filtra la lista visual para que el producto desaparezca al instante
      setCartItems(prevItems => prevItems.filter(item => item.id_detalle !== idDetalle));
      
      // Alerta de confirmacion de producto borrado
      Swal.fire({
        title: 'Eliminado',
        text: 'Producto retirado del carrito',
        icon: 'success',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar el producto', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera con el botón del carrito */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Catálogo de Productos</h1>
            <p className="text-slate-500 mt-2 text-lg">Encuentra los mejores productos del mercado.</p>
          </div>
          
          <button 
            onClick={handleOpenCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-md flex items-center gap-2"
          >
            <ShoppingCart size={24} />
            Ver mi Carrito
          </button>
        </header>
        
        {cargando ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-indigo-600 font-bold text-xl animate-pulse">
              Cargando catálogo...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {productos.map((producto) => (
              <ProductCard key={producto.id} product={producto} />
            ))}
          </div>
        )}

      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        productos={productos} // Le pasamos el catalogo completo para cruzar las fotos
      />
      
    </div>
  );
}

export default App;