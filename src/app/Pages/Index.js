import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover" />
            <h2 className="text-xl">{product.title}</h2>
            <p>{product.price} USD</p>
          </div>
        ))}
      </div>
    </div>
  );
}
