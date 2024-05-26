import React from 'react';

const ProductCard = ({ product, onClick }) => (
  <div className="border p-4 cursor-pointer" onClick={() => onClick(product.id)}>
    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
    <h3 className="mt-2 text-lg">{product.title}</h3>
    <p className="text-gray-500">{product.store}</p>
    <p className="text-red-500">${product.price}</p>
  </div>
);

export default ProductCard;
