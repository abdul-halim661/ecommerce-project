import { useState } from 'react';
const products=[
{id:1,name:'Bandit 23 Hoodie',price:3200,tag:'Back on Track • 4 Months Later'},
{id:2,name:'OverTheWire Tee',price:1800,tag:'New Drop'},
{id:3,name:'Aura Cap',price:950,tag:'Limited'}];
export default function App(){
const [cart,setCart]=useState(0);
return(<div className="min-h-screen bg-black text-white font-sans">
<header className="flex justify-between items-center px-6 py-4 border-b border-zinc-800">
<h1 className="text-2xl font-bold">AURA<span className="text-[#00FF88]">.</span></h1>
<div className="bg-white text-black px-4 py-1 text-sm font-bold">CART: {cart}</div>
</header>
<section className="text-center px-4 py-12 bg-gradient-to-b from-zinc-900 to-black">
<p className="text-zinc-400 mb-2">Back on Track • 4 Months Later</p>
<h2 className="text-5xl font-black mb-4">AURA ECOMMERCE</h2>
<p className="text-zinc-500 max-w-xl mx-auto mb-6">Streetwear built for the grind.</p>
<button onClick={()=>setCart(cart+1)} className="bg-white text-black px-8 py-3 font-bold">SHOP NOW</button>
</section>
<section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
{products.map(p=>(
<div key={p.id} className="border border-zinc-800 p-4">
<div className="h-56 bg-zinc-900 mb-4 flex items-center justify-center text-zinc-600">Image</div>
<p className="text-xs text-zinc-500 mb-1">{p.tag}</p>
<h3 className="font-bold text-lg">{p.name}</h3>
<p className="text-[#00FF88] mt-1">৳ {p.price}</p>
<button onClick={()=>setCart(cart+1)} className="w-full mt-4 bg-white text-black py-2 text-sm font-bold">ADD TO CART</button>
</div>))}
</section>
<footer className="text-center py-8 text-zinc-600 text-sm border-t border-zinc-900 mt-10">© 2026 AURA • Built by Abdul Halim</footer>
</div>);}