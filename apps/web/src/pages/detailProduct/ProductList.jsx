import React from 'react';
import dummy from '../../assets/images/dummy/dummy.png'; 

const products = Array(12).fill({
  title: "Men's formal suit - Black & White",
  price: "$40.00",
  rating: 4,
  reviews: 10,
  image: dummy, 
});

function ProductList() {
  const handleProductClick = (product) => {
    // logic api
    console.log(`Product clicked: ${product.title}`);
  };

  return (
    <div className="p-4">
     <h1 className="text-4xl font-bold pt-[20px] font-blanja_metropolis">You can also like this</h1>
        <h2 className="text-xs text-gray-500 pt-1">
        You’ve never seen it before!
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded" onClick={() => handleProductClick(product)}>
            <img src={product.image} alt={product.title} className="mb-4" />
            <h3 className="text-lg">{product.title}</h3>
            <p className="text-gray-700">{product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating} ({product.reviews} reviews)</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
