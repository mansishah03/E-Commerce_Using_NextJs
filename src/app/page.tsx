"use client"; // Enable Client Component for interactivity

import { useState, useEffect } from "react";

// Define product type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add item to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">E-Commerce</h1>
        <p>Cart Items: {cart.length}</p>
      </header>
      <main className="max-w-7xl mx-auto py-8 grid gap-4 grid-cols-1 md:grid-cols-3">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error fetching products: {error}</p>}
        {!loading && !error && products.map((product) => (
          <div key={product.id} className="p-4 bg-white shadow rounded-lg">
            <img src={product.image} alt={product.title} className="h-48 w-full object-cover mb-2" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Page;
