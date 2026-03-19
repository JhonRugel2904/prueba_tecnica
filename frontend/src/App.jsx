import { useEffect, useState } from 'react';
import { getProducts } from './services/productService';
import ProductCard from './components/ProductCard'; 

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true); 

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

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Catálogo de Productos</h1>
          <p className="text-slate-500 mt-2 text-lg">Encuentra los mejores precios con descuentos aplicados.</p>
        </header>
        
        {cargando ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-indigo-600 font-bold text-xl animate-pulse">
              Cargando catálogo...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {productos.map((producto, index) => (
              <ProductCard key={index} product={producto} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;