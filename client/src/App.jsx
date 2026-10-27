import { useState } from "react";

const products = [
  { id: 1, name: "Hoodie Noir", price: 2850, cat: "Hoodie", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
  { id: 2, name: "Cargo Pants", price: 3200, cat: "Pants", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500" },
  { id: 3, name: "Street Tee", price: 1500, cat: "T-Shirt", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500" },
  { id: 4, name: "Denim Jacket", price: 4500, cat: "Jacket", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
  { id: 5, name: "Oversized Tee", price: 1200, cat: "T-Shirt", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" },
  { id: 6, name: "Urban Hoodie", price: 3100, cat: "Hoodie", img: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=500" },
  { id: 7, name: "Classic Sneakers", price: 5500, cat: "Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" },
  { id: 8, name: "Bucket Bag", price: 2200, cat: "Accessories", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500" },
];

export default function App() {
  const [active, setActive] = useState("All");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  const filtered = active === "All" ? products : products.filter(p => p.cat === active);

  const addToCart = (e, p) => {
    e.stopPropagation(); // কার্ড ক্লিক থেকে আটকাবে
    setCart([...cart, p]);
    alert(`${p.name} added to BAG! Total: ${cart.length + 1}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-5 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="font-black text-lg">AURA STUDIO 2026</h1>
        <div className="bg-white text-black px-4 py-1 rounded-full font-bold text-sm">BAG ({cart.length})</div>
      </div>

      <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
        {["All","Hoodie","T-Shirt","Pants","Jacket","Shoes","Accessories"].map(c=>(
          <button key={c} onClick={()=>setActive(c)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${active===c ? 'bg-white text-black' : 'bg-zinc-800'}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {filtered.map(p=>(
          <div key={p.id} onClick={()=>setSelected(p)} className="cursor-pointer">
            <img src={p.img} className="w-full h-56 object-cover rounded-2xl" />
            <p className="mt-2 text-sm font-bold">{p.name}</p>
            <p className="text-sm">৳{p.price.toLocaleString()}</p>
            <button onClick={(e)=>addToCart(e,p)} className="mt-2 w-full bg-white text-black py-2 rounded-full font-bold text-xs">ADD TO CART</button>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={()=>setSelected(null)}>
          <div className="bg-zinc-900 rounded-3xl max-w-sm w-full overflow-hidden" onClick={e=>e.stopPropagation()}>
            <img src={selected.img} className="w-full h-80 object-cover" />
            <div className="p-5">
              <h2 className="text-2xl font-black">{selected.name}</h2>
              <p className="opacity-60">{selected.cat}</p>
              <p className="text-xl font-bold mt-2">৳{selected.price}</p>
              <button onClick={(e)=>{addToCart(e,selected); setSelected(null)}} className="w-full bg-white text-black py-3 rounded-full font-bold mt-4">ADD TO CART</button>
              <button onClick={()=>setSelected(null)} className="w-full bg-zinc-800 py-3 rounded-full mt-2">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}