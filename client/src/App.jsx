import { useState, useEffect } from 'react'

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    fetch('https://aura-ecommerce-ww1b.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="flex justify-between items-center p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-black tracking-widest">AURA.STORE</h1>
        <div className="flex gap-4 items-center">
          <span className="bg-zinc-800 px-4 py-1 rounded-full">Cart ({cart})</span>
        </div>
      </nav>

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && <p className="col-span-3 text-center text-zinc-500 mt-20">Loading products...</p>}
        {products.map(product => (
          <div key={product.id} className="bg-zinc-900 p-3 rounded-2xl">
            <img src={product.image} className="w-full h-56 object-cover rounded-xl mb-3" />
            <h2 className="font-bold">{product.name}</h2>
            <p className="text-zinc-400">${product.price}</p>
            <button onClick={() => setCart(cart + 1)} className="mt-2 w-full bg-white text-black py-2 rounded-full font-bold">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App