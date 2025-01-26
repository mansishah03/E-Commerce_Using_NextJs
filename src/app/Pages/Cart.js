import { useState } from 'react';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-4xl font-bold text-center">Shopping Cart</h1>
      </header>
      <main className="container mx-auto py-8">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg mb-4 bg-white shadow-md">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>${item.price} USD</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
