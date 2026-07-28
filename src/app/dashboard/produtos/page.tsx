/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Package, Search, 
  Trash2, Edit3, Loader2, Image as ImageIcon,
  CheckCircle2, AlertCircle, X,
  ShoppingBag, HelpCircle
} from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { SectionCard } from "@/components/dashboard/SectionCard";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  active: boolean;
}

interface Toast {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);
  
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "vips",
    image: "",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(null), 4000);
  };

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
      // Evitamos exibir toast de erro se a API ainda não existir para não assustar no front-end vazio
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    loadProducts(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const method = form.id ? "PATCH" : "POST"; 
    const payload = { ...form, price: parseFloat(form.price) || 0 };
    
    try {
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro no servidor");
      }

      setIsModalOpen(false);
      setForm({ id: "", name: "", description: "", price: "", category: "vips", image: "" });
      showToast(form.id ? "Pacote atualizado com sucesso!" : "Novo pacote criado!", "success");
      loadProducts();

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao processar pacote. Verifique a API.";
      showToast(message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este item da loja? Esta ação não pode ser desfeita.")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");
      showToast("Pacote removido com sucesso!", "success");
      loadProducts();
    } catch {
      showToast("Erro ao excluir o pacote.", "error");
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && products.length === 0) return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      <span className="text-zinc-500 font-black uppercase italic text-[10px] tracking-tighter">Sincronizando Inventário...</span>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* TOAST NOTIFICATIONS */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md font-bold text-sm tracking-wide ${toast.type === "success" ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-400" : "bg-red-950/90 border-red-500/30 text-red-400"}`}
          >
            {toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader 
        title="Gestão de Produtos"
        subtitle="Organize o catálogo da sua loja, ajuste preços e categorias."
        category="Catálogo & Vendas"
        categoryColor="text-emerald-500"
        icon={<Package className="w-4 h-4" />}
        actionButton={{
          label: "NOVO PACOTE",
          icon: <Plus className="w-5 h-5" />,
          onClick: () => { 
            setForm({ id: "", name: "", description: "", price: "", category: "vips", image: "" }); 
            setIsModalOpen(true); 
          },
          colorClass: "bg-emerald-500 hover:bg-emerald-600 text-black shadow-xl shadow-emerald-500/20"
        }}
      />

      <SectionCard 
        title="Inventário Ativo" 
        subtitle={`Você tem ${products.length} itens cadastrados`}
        icon={<ShoppingBag className="w-6 h-6" />}
        iconColorClass="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
        headerAction={
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" placeholder="Buscar pacote..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-xs focus:border-emerald-500/50 outline-none text-white font-medium transition-colors"
            />
          </div>
        }
      >
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-[#0a0a0a] border border-white/5 rounded-[32px] overflow-hidden group hover:border-emerald-500/30 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)] transition-all duration-300 flex flex-col">
                
                {/* IMAGEM E CATEGORIA */}
                <div className="h-44 bg-[#050505] relative border-b border-white/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opacity-80" />
                  {product.image ? (
                    <img src={product.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt={product.name} />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-zinc-800 relative z-0" />
                  )}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20 z-20 shadow-lg">
                    {product.category}
                  </div>
                </div>
                
                {/* INFORMAÇÕES */}
                <div className="p-6 flex-1 flex flex-col justify-between relative z-20 -mt-6">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter truncate drop-shadow-md">{product.name}</h3>
                    <p className="text-zinc-500 text-xs line-clamp-2 mt-2 leading-relaxed font-medium">{product.description}</p>
                  </div>
                  
                  {/* PREÇO E AÇÕES */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest">Valor</span>
                      <span className="text-2xl font-black italic text-emerald-400">R$ {product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setForm({ ...product, price: product.price.toString(), image: product.image || "" }); setIsModalOpen(true); }}
                        className="p-3 bg-white/5 rounded-xl hover:bg-emerald-500/10 text-zinc-400 hover:text-emerald-400 transition-colors border border-transparent hover:border-emerald-500/20"
                        title="Editar Pacote"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-white/5 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-colors border border-transparent hover:border-red-500/20"
                        title="Remover Pacote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="py-20 flex flex-col items-center justify-center text-center bg-black/20 rounded-[32px] border-2 border-dashed border-white/5">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-4 border border-emerald-500/20">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black italic uppercase text-white mb-2">Sua prateleira está vazia</h3>
            <p className="text-zinc-500 text-sm max-w-sm mb-6">Comece a faturar cadastrando seu primeiro pacote de VIP, veículo ou item para os jogadores.</p>
            <button 
              onClick={() => { setForm({ id: "", name: "", description: "", price: "", category: "vips", image: "" }); setIsModalOpen(true); }}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-black px-6 py-3 rounded-xl text-xs uppercase tracking-widest transition-transform hover:scale-105 shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> CADASTRAR PRODUTO
            </button>
          </div>
        )}
      </SectionCard>

      {/* MODAL DE CRIAÇÃO/EDIÇÃO (Estilo Glassmorphism Premium) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
            >
              {/* HEADER DO MODAL */}
              <div className="p-8 pb-6 border-b border-white/5 flex justify-between items-center shrink-0">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black italic uppercase tracking-tighter text-white">
                    {form.id ? "Editar Pacote" : "Novo Pacote"}
                  </h2>
                  <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mt-1">Configure os detalhes da oferta</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors border border-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* CORPO DO FORMULÁRIO (Com Scroll se precisar) */}
              <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Nome do Pacote</label>
                    <input required type="text" placeholder="Ex: VIP Diamante" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 outline-none text-white font-bold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Preço (R$)</label>
                    <input required type="number" step="0.01" placeholder="0.00" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 outline-none text-emerald-400 font-mono font-bold transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Categoria na Loja</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 outline-none text-zinc-300 cursor-pointer transition-colors appearance-none">
                    <option value="vips">🎩 VIPS</option>
                    <option value="veiculos">🚗 VEÍCULOS</option>
                    <option value="casas">🏠 CASAS</option>
                    <option value="dinheiro">💰 DINHEIRO IN-GAME</option>
                    <option value="extras">💎 EXTRAS</option>
                    <option value="outros">📦 OUTROS</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Descrição Breve</label>
                    <span className="text-[9px] text-zinc-600 font-bold uppercase">Aparece na vitrine</span>
                  </div>
                  <textarea rows={3} placeholder="Descreva os benefícios..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 outline-none text-zinc-300 min-h-[80px] transition-colors resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">URL da Imagem Ilustrativa (Opcional)</label>
                  <input type="text" placeholder="Link do Imgur, Discord, etc..." value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500/50 outline-none text-white transition-colors" />
                </div>
                
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                    Dica: Deixe a imagem atraente para aumentar suas vendas. Ao salvar, os dados serão enviados instantaneamente para o banco de dados.
                  </p>
                </div>
              </div>

              {/* FOOTER DO MODAL */}
              <div className="p-8 border-t border-white/5 bg-[#050505] shrink-0">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black py-6 rounded-2xl text-xs sm:text-sm shadow-xl shadow-emerald-500/10 uppercase tracking-widest italic transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (form.id ? "SALVAR ALTERAÇÕES" : "CRIAR PRODUTO NA LOJA")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}