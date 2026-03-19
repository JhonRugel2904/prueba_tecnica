import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems, onRemoveItem, productos = [] }) => { 
  // Asegurar que carItem siempre sea array para evitar errores 
  const validCartItems = Array.isArray(cartItems) ? cartItems : [];
  
  // Sumamos los precios para sacar el total a pagar
  const totalAmount = validCartItems.reduce((sum, item) => sum + parseFloat(item.precio || 0), 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose}></div>
      )}

      {/* Contenedor del drawer que se desliza desde la derecha */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Cabecera */}
        <div className="p-5 border-b flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-800">Mi Carrito</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-1 rounded-full">
              {validCartItems.length}
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {validCartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ShoppingBag size={48} className="mb-4 opacity-20" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            validCartItems.map((item) => {
              // Busca el id que viene de la DB dentro del catalogo de productos
              const infoOriginal = productos.find(p => p.id === item.id_producto);
              const tituloMostrar = infoOriginal ? infoOriginal.title : `Producto Desconocido`;
              const fotoMostrar = infoOriginal ? infoOriginal.thumbnail : 'https://via.placeholder.com/150';

              return (
                <div key={item.id_detalle} className="flex gap-4 border border-slate-100 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Foto sacada del catálogo */}
                  <img src={fotoMostrar} alt={tituloMostrar} className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                  
                  {/* Info del producto */}
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1" title={tituloMostrar}>
                      {tituloMostrar}
                    </h4>
                    <p className="text-xs text-slate-500 mb-1">SKU: {item.sku}</p>
                    <p className="text-lg font-black text-indigo-600">${item.precio}</p>
                  </div>
                  
                  {/* Botón para borrar el item de la DB */}
                  <div className="flex items-center">
                    <button 
                      onClick={() => onRemoveItem(item.id_detalle)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pie del carrito con el total */}
        <div className="border-t p-5 bg-slate-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500 font-medium">Total a pagar:</span>
            <span className="text-2xl font-black text-slate-800">${totalAmount.toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
            disabled={validCartItems.length === 0}
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;