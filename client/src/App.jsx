import { useState } from "react";

const products = [
  { id: 1, name: "Monelle White Hoodie", category: "Hoodie", price: 2500, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
  { id: 2, name: "F-ones Shorts", category: "Pants", price: 1200, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400" },
  { id: 3, name: "Street Tee", category: "T-Shirt", price: 900, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
  { id: 4, name: "Phantom Jacket", category: "Jacket", price: 4500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { id: 5, name: "Basic Custom Tee", category: "T-Shirt", price: 750, image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400" },
  { id: 6, name: "Bucket Hat", category: "Accessories", price: 600, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400" },
  { id: 7, name: "Granite Tee", category: "T-Shirt", price: 850, image: "https://images.unsplash.com/photo-1583744946564-1495d2d1dc32?w=400" },
];

const categories = ["All", "Hoodie", "T-Shirt", "Pants", "Jacket", "Shoes", "Accessories"];

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const filtered = products.filter(p => {
    const matchCat = activeCat === "All" || p.category === activeCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowCart(true);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-black text-xl">AURA STUDIO 2026</h1>
        <button onClick={() => setShowCart(!showCart)} className="bg-white text-black px-4 py-1 rounded-full font-bold">
          BAG ({cart.length})
        </button>
      </header>

      <h2 className="text-5xl font-black leading-none mb-4">NEW DROP<br/>2026.</h2>

      <input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search..." className="w-full bg-[#111] border border-white/10 p-3 rounded-xl mb-4 outline-none" />

      <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
        {categories.map(cat => (
          <button key={cat} onClick={()=>setActiveCat(cat)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeCat===cat ? 'bg-white text-black' : 'bg-[#222]'}`}>{cat}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filtered.map(p => (
          <div key={p.id} onClick={()=>setSelected(p)} className="bg-[#111] rounded-2xl overflow-hidden cursor-pointer">
            <img src={p.image} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="text-xs opacity-70">{p.name}</p>
              <p className="font-bold">৳{p.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] rounded-3xl max-w-sm w-full overflow-hidden">
            <img src={selected.image} className="w-full h-80 object-cover" />
            <div className="p-5">
              <h3 className="text-2xl font-black">{selected.name}</h3>
              <p className="opacity-60 text-sm">{selected.category}</p>
              <p className="text-xl font-bold mt-2">৳{selected.price}</p>
              <div className="flex gap-3 mt-4">
                <button onClick={()=>setSelected(null)} className="flex-1 bg-[#222] py-3 rounded-full">Close</button>
                <button onClick={()=>{addToCart(selected); setSelected(null)}} className="flex-1 bg-white text-black py-3 rounded-full font-bold">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 flex justify-end z-50">
          <div className="bg-white text-black w-full max-w-sm h-full p-5 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black">BAG ({cart.length})</h3>
              <button onClick={()=>setShowCart(false)} className="bg-black text-white px-4 py-1 rounded-full">X</button>
            </div>
            {cart.length===0 ? <p>Your bag is empty</p> : cart.map((c,i)=>(
              <div key={i} className="flex gap-3 mb-3 border-b pb-3">
                <img src={c.image} className="w-16 h-16 rounded-lg object-cover" />
                <div><p className="font-bold text-sm">{c.name}</p><p>৳{c.price}</p></div>
              </div>
            ))}
            {cart.length>0 && <button className="w-full bg-black text-white py-3 rounded-full mt-4 font-bold">Checkout ৳{cart.reduce((a,b)=>a+b.price,0)}</button>}
          </div>
        </div>
      )}
    </div>
  );
}