import { useState } from "react";

const products = [
  { id: 1, name: "Hoodie Noir", price: 2850, cat: "Hoodie", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500" },
  { id: 2, name: "Cargo Pants", price: 3200, cat: "Pants", img: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500" },
  { id: 3, name: "Street Tee", price: 1500, cat: "T-Shirt", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500" },
  { id: 4, name: "Denim Jacket", price: 4500, cat: "Jacket", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
  { id: 5, name: "Wide Jeans", price: 3800, cat: "Pants", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
  { id: 6, name: "Puffer Jacket", price: 6200, cat: "Jacket", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500" },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [active, setActive] = useState("All");

  const addToCart = (e, p) => {
    if(e) e.stopPropagation();
    setCart([...cart, p]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const filtered = active === "All" ? products : products.filter(p => p.cat === active);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center p-5 border-b border-zinc-800 sticky top-0 bg-black z-10">
        <h1 className="font-black">AURA STUDIO 2026</h1>
        <div className="flex gap-4">
          <button onClick={() => setShowCart(false)} className="font-bold">SHOP</button>
          <button onClick={() => setShowCart(true)} className="bg-white text-black px-4 py-1 rounded-full font-bold text-sm">CART({cart.length})</button>
        </div>
      </div>

      {!showCart ? (
        <>
          <div className="flex gap-2 p-5 overflow-x-auto">
            {["All","Hoodie","T-Shirt","Pants","Jacket"].map(c=>(
              <button key={c} onClick={()=>setActive(c)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${active===c ? 'bg-white text-black' : 'bg-zinc-800'}`}>{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
            {filtered.map(p=>(
              <div key={p.id} className="cursor-pointer">
                <img src={p.img} className="w-full h-56 object-cover rounded-2xl" />
                <p className="mt-2 font-bold text-sm">{p.name}</p>
                <p className="text-sm opacity-60">৳{p.price}</p>
                <button onClick={(e)=>addToCart(e,p)} className="mt-2 w-full bg-white text-black py-2 rounded-full font-bold text-xs">ADD TO CART</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* CART PAGE - এখন সব দেখাবে */
        <div className="p-5">
          <h2 className="text-2xl font-black mb-4">Your Bag - ৳{total}</h2>
          {cart.length === 0 ? <p>Bag is empty</p> : cart.map((item, i) => (
            <div key={i} className="flex gap-4 bg-zinc-900 rounded-2xl p-4 mb-3 items-center">
              <img src={item.img} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <p className="opacity-60">৳{item.price}</p>
              </div>
              <button onClick={()=>removeFromCart(i)} className="text-sm underline opacity-60">Remove</button>
            </div>
          ))}
          {cart.length > 0 && <button className="w-full bg-white text-black py-3 rounded-full font-bold mt-4">CHECKOUT ৳{total}</button>}
          <button onClick={()=>setShowCart(false)} className="w-full bg-zinc-800 py-3 rounded-full mt-2">Continue Shopping</button>
        </div>
      )}
    </div>
  );
}
