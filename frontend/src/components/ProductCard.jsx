import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
      
      {/* Contenedor de la imagen */} 
      <div className="relative h-56 bg-white p-4 flex justify-center items-center border-b border-slate-100 overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
        {/* Etiqueta de descuento */}
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
          -{product.discountPercentage}%
        </span>
      </div>
      
      {/* Información del producto */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
          {product.brand || 'General'}
        </span>
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        
        {/* Precios y boton */}
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-400 line-through">${product.totalPrice}</p>
            <p className="text-2xl font-black text-indigo-600">${product.price}</p>
          </div>
          <button className="bg-slate-900 hover:bg-indigo-600 text-white p-3 rounded-xl transition-colors shadow-sm flex items-center justify-center">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;