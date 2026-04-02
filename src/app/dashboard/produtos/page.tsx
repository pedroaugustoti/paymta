"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Package, Search, 
  Trash2, Edit3, Loader2, Image as ImageIcon,
  CheckCircle2, AlertCircle, X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  active: boolean;
}

// Tipo para nossa notificação personalizada
interface Toast {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para as notificações
  const [toast, setToast] = useState<Toast | null>(null);
  
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "vips",
    image: "",
  });

  // Função para disparar notificações
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(null), 4000); // Some após 4 segundos
  };

  // 1. CARREGAR PRODUTOS
  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        throw new Error("Falha ao carregar");
      }
    } catch (err) {
      console.error("Erro ao buscar inventário:", err);
      showToast("Erro ao sincronizar inventário.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadProducts(); }, []);

  // 2. SALVAR / EDITAR (Corrigido!)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST"; // Verifique se sua API usa PATCH ou PUT para edição
    
    // Tratamento crucial: Converter o preço de volta para número antes de enviar
    const payload = {
      ...form,
      price: parseFloat(form.price) || 0 
    };
    
    try {
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Se a API retornar erro de validação (400) ou servidor (500), forçamos o erro
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro no servidor");
      }

      // Sucesso!
      setIsModalOpen(false);
      setForm({ id: "", name: "", description: "", price: "", category: "vips", image: "" });
      showToast(form.id ? "Pacote atualizado com sucesso!" : "Novo pacote criado!", "success");
      loadProducts();

    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Erro ao processar pacote. Verifique os dados.", "error");
    }
  };

  // 3. EXCLUIR (Com notificação)
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este item da loja?")) return;
    
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      
      showToast("Pacote removido com sucesso!", "success");
      loadProducts();
    } catch (err) {
      showToast("Erro ao excluir o pacote.", "error");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && products.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Sincronizando Inventário...</span>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 relative">
      
      {/* SISTEMA DE NOTIFICAÇÕES (TOAST) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm tracking-wide ${
              toast.type === "success" 
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" 
                : "bg-red-950/90 border-red-500/30 text-red-400"
            }`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER E BUSCA */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Package className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Gestão de Catálogo</span>
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">Produtos</h1>
        </div>

        <div className="flex w-full md:w-auto gap-4">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" placeholder="Filtrar pacotes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs focus:border-yellow-500 outline-none text-white transition-colors"
              />
           </div>
           <Button 
            onClick={() => { setForm({ id: "", name: "", description: "", price: "", category: "vips", image: "" }); setIsModalOpen(true); }}
            className="bg-white hover:bg-zinc-200 text-black font-black px-8 py-7 rounded-2xl flex items-center gap-2 shadow-xl active:scale-95 transition-all"
           >
            <Plus className="w-5 h-5" /> NOVO ITEM
           </Button>
        </div>
      </header>

      {/* GRID DE PRODUTOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-zinc-950/50 border border-white/5 rounded-[32px] overflow-hidden group hover:border-yellow-500/30 transition-all shadow-2xl">
            <div className="h-40 bg-zinc-900 relative">
              {product.image ? (
                <img src={product.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={product.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-800"><ImageIcon className="w-10 h-10" /></div>
              )}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-yellow-500 border border-yellow-500/20">
                {product.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-black text-white uppercase italic truncate">{product.name}</h3>
              <p className="text-zinc-500 text-[11px] line-clamp-2 mt-1 mb-6 leading-relaxed font-medium">{product.description}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-2xl font-black italic text-white">R$ {product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                <button 
                  onClick={() => { 
                    setForm({ 
                      ...product, 
                      price: product.price.toString(), 
                      image: product.image || "" 
                    }); 
                    setIsModalOpen(true); 
                  }}
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                  title="Editar pacote"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(product.id)}
                  className="p-3 bg-red-500/5 rounded-xl hover:bg-red-500/20 text-red-900 hover:text-red-500 transition-all"
                  title="Excluir pacote"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0c0c0c] border border-white/10 w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                    {form.id ? "Editar Pacote" : "Novo Pacote"}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Nome do Pacote</label>
                      <input 
                        required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="Ex: VIP DIAMANTE" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-yellow-500 outline-none text-white font-bold transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Preço (R$)</label>
                      <input 
                        required type="number" step="0.01" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                        placeholder="49.90" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none text-white font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Categoria na Loja</label>
                    <select 
                      value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-yellow-500 outline-none text-zinc-300 cursor-pointer transition-colors"
                    >
                      <option value="vips">VIPS</option>
                      <option value="veiculos">VEÍCULOS</option>
                      <option value="casas">CASAS</option>
                      <option value="dinheiro">DINHEIRO</option>
                      <option value="extras">EXTRAS</option>
                      <option value="outros">OUTROS</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Descrição Breve</label>
                    <textarea 
                      rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                      placeholder="O que o jogador ganha ao comprar?" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-yellow-500 outline-none text-zinc-300 min-h-[80px] transition-colors resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">URL da Imagem Ilustrativa</label>
                    <input 
                      type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                      placeholder="Link do Imgur ou Discord" className="w-full bg-black border border-white/10 rounded-2xl p-4 text-sm focus:border-purple-500 outline-none text-white transition-colors"
                    />
                  </div>

                  <div className="pt-6">
                    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-8 rounded-[24px] text-lg shadow-xl shadow-yellow-500/10 uppercase italic transition-all active:scale-95">
                      {form.id ? "SALVAR ALTERAÇÕES" : "CRIAR PRODUTO NO BANCO"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}