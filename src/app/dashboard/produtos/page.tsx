"use client";

import { useState, useEffect } from "react";
import { Package, Plus, Trash2, Tag, DollarSign, Loader2, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProdutosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // ESTADO DO FORMULÁRIO COM O CAMPO IMAGE
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "vips",
    icon: "gem",
    image: "" // Campo para a URL da foto
  });

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) setProducts(await res.json());
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleAddProduct = async () => {
    if (!form.name || !form.price) return alert("Nome e preço são obrigatórios!");
    
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setShowModal(false);
        setForm({ name: "", description: "", price: "", category: "vips", icon: "gem", image: "" });
        loadProducts();
      }
    } catch (error) {
      alert("Erro ao cadastrar produto.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex items-center justify-center h-screen text-zinc-500 font-black uppercase italic tracking-tighter">
      <Loader2 className="w-5 h-5 animate-spin text-yellow-500 mr-2" /> Sincronizando Estoque...
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Produtos & Vips</h1>
          <p className="text-zinc-500 text-sm">Gerencie os itens da sua loja savana.</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-2xl px-6 py-6 shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" /> NOVO PRODUTO
        </Button>
      </header>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-[40px] flex flex-col items-center justify-center text-zinc-600">
            <Package className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-bold uppercase italic tracking-widest text-xs">Nenhum produto cadastrado</p>
          </div>
        ) : (
          products.map((p: any) => (
            <div key={p.id} className="bg-zinc-950 border border-white/5 rounded-[32px] overflow-hidden group hover:border-yellow-500/30 transition-all duration-500">
              {/* FOTO DO PRODUTO */}
              <div className="h-48 bg-zinc-900 relative overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-800 italic font-black uppercase text-[10px]">Sem Imagem</div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-yellow-500 border border-yellow-500/20">
                  {p.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-black text-xl uppercase italic tracking-tighter text-white mb-2">{p.name}</h3>
                <p className="text-zinc-500 text-xs line-clamp-2 mb-6 font-medium leading-relaxed">{p.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Preço Unitário</span>
                    <span className="text-2xl font-black text-white italic">R$ {p.price.toFixed(2)}</span>
                  </div>
                  <button className="p-3 rounded-xl bg-red-500/5 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL DE CADASTRO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-zinc-950 border border-white/10 p-8 rounded-[40px] max-w-lg w-full shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] -z-10"></div>
            
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                <Tag className="text-yellow-500 w-6 h-6" /> Cadastrar Item
              </h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white"><X /></button>
            </header>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 mb-2 block">Nome do Produto</label>
                <input 
                  placeholder="Ex: VIP OURO 30 DIAS" 
                  className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-yellow-500 transition-all"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 mb-2 block">Link da Foto (Imgur/Discord)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input 
                    placeholder="https://i.imgur.com/..." 
                    className="w-full bg-black border border-white/10 py-4 pl-12 pr-4 rounded-2xl text-sm outline-none focus:border-yellow-500 transition-all"
                    value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 mb-2 block">Descrição dos Benefícios</label>
                <textarea 
                  placeholder="Liste o que o jogador ganha..." 
                  className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-yellow-500 h-28 resize-none"
                  value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 mb-2 block">Valor (BRL)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                      type="number" placeholder="0.00"
                      className="w-full bg-black border border-white/10 py-4 pl-10 pr-4 rounded-2xl text-sm outline-none focus:border-yellow-500"
                      value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase ml-1 mb-2 block">Categoria</label>
                  <select 
                    className="w-full bg-black border border-white/10 p-4 rounded-2xl text-sm outline-none focus:border-yellow-500 text-zinc-400 appearance-none cursor-pointer"
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})}
                  >
                    <option value="vips">VIPS</option>
                    <option value="veiculos">VEÍCULOS</option>
                    <option value="casas">CASAS</option>
                    <option value="dinheiro">DINHEIRO</option>
                    <option value="extras">EXTRAS</option>
                    <option value="outros">OUTROS</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <Button 
                onClick={() => setShowModal(false)} 
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-500 font-bold rounded-2xl py-7"
              >
                CANCELAR
              </Button>
              <Button 
                onClick={handleAddProduct} 
                disabled={loading} 
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-black rounded-2xl py-7"
              >
                {loading ? <Loader2 className="animate-spin" /> : "CADASTRAR ITEM"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}