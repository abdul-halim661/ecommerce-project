import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    fetch('https://aura-ecommerce-ww1b.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        const withImages = data.map(p => ({
          ...p,
          img: p.id == 1 ? 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' :
               p.id == 2 ? 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80' :
               p.id == 3 ? 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' :
               'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'
        }));
        setProducts(withImages);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex justify-between items-center p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-black tracking-widest">AURA.STORE</h1>
        <div className="flex gap-4 items-center">
          <span className="bg-zinc-800 px-4 py-1 rounded-full">Cart ({cart})</span>
          <button className="bg-white text-black px-5 py-1.5 rounded-full font-bold">Shop</button>
        </div>
      </nav>

      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-zinc-900 p-3 rounded-2xl">
            <img src={product.img} className="w-full h-48 object-cover rounded-xl mb-3" />
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-zinc-400">${product.price}</p>
            <button onClick={() => setCart(cart + 1)} className="mt-2 w-full bg-white text-black py-2 rounded-full font-bold">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <p className="text-center text-zinc-600 p-10 text-sm">Data coming from https://aura-ecommerce-ww1b.onrender.com/api/products</p>
    </div>
  )
}

export default App