"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShoppingCart, Plus, Minus, X, Eye, 
  Gem, DollarSign, Zap, Trash2, 
  Smartphone, Copy, CheckCircle2, Loader2, Package 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

interface Produto {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
  image?: string;
}

interface CartItem {
  id: string;
  qtd: number;
}

const ICON_MAP: any = {
  gem: <Gem className="w-8 h-8 text-cyan-400" />,
  dollar: <DollarSign className="w-8 h-8 text-emerald-400" />,
  zap: <Zap className="w-8 h-8 text-orange-400" />,
};

export default function LojaVipPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  
  const [search, setSearch] = useState("");
  const [catAtiva, setCatAtiva] = useState("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Produto | null>(null);
  
  const [checkoutStep, setCheckoutStep] = useState<"none" | "pix">("none");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qrCodeBase64: string, copiaECola: string } | null>(null);

  useEffect(() => {
    async function loadShopData() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/shop/config?slug=${slug}`);
        const data = await res.json();
        if (data && !data.error) {
          setSettings(data);
          setProdutos(data.products || []);
        }
      } catch (err) {
        console.error("Erro ao carregar loja:", err);
      } finally {
        setLoading(false);
      }
    }
    loadShopData();
  }, [slug]);

  const categoriasDisponiveis = useMemo(() => {
    if (produtos.length === 0) return ["todos"];
    const unicas = Array.from(new Set(produtos.map((p) => p.category.toLowerCase())));
    return ["todos", ...unicas];
  }, [produtos]);

  const addToCart = (id: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) return prev.map((i) => (i.id === id ? { ...i, qtd: i.qtd + 1 } : i));
      return [...prev, { id, qtd: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => 
      prev.map((i) => (i.id === id ? { ...i, qtd: Math.max(0, i.qtd - 1) } : i))
          .filter((i) => i.qtd > 0)
    );
  };

  const removeTotal = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));

  const cartDetails = useMemo(() => {
    return cart.map(item => {
      const p = produtos.find(prod => prod.id === item.id)!;
      return { ...p, qtd: item.qtd, total: (p?.price || 0) * item.qtd };
    });
  }, [cart, produtos]);

  const totalGeral = useMemo(() => cartDetails.reduce((acc, curr) => acc + curr.total, 0), [cartDetails]);
  const totalItens = useMemo(() => cart.reduce((acc, curr) => acc + curr.qtd, 0), [cart]);

  const filtered = produtos.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase()) && 
    (catAtiva === "todos" || p.category.toLowerCase() === catAtiva.toLowerCase())
  );

  const handleGeneratePix = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, items: cartDetails, total: totalGeral })
      });

      if (!res.ok) throw new Error("Falha ao gerar o PIX");

      const data = await res.json();
      setPixData({ qrCodeBase64: data.qr_code_base64, copiaECola: data.qr_code });
      setCheckoutStep("pix");
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao conectar com o Mercado Pago. Tente novamente.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData?.copiaECola) {
      navigator.clipboard.writeText(pixData.copiaECola);
      alert("Código PIX Copiado!");
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#050505]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-600" />
      <span className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px]">Acessando Catálogo...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white" style={{ "--primary": settings?.primaryColor || "#facb11" } as any}>
      {/* HERO SECTION REDUZIDA E MAIS LEVE */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden border-b border-white/5">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${settings?.heroImageUrl || ""})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
         
         <div className="relative z-10 text-center px-6 mt-10">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-4 text-white">
               {settings?.serverName || "MTA SHOP"}
            </h1>
            <p className="text-[var(--primary)] font-bold uppercase tracking-[0.3em] text-[10px] py-2 px-4 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/5 inline-block">
              {settings?.slogan || "Sua nova vida começa aqui"}
            </p>
         </div>
      </section>

      <div className="p-6 max-w-7xl mx-auto w-full -mt-10 relative z-20">
        
        {/* BUSCA E FILTROS (Sem Blur Pesado) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-[#0a0a0a] p-4 rounded-3xl border border-white/5 shadow-2xl">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" placeholder="Buscar..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm focus:border-[var(--primary)] outline-none transition-colors text-white"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide py-1">
            {categoriasDisponiveis.map((c) => (
              <button 
                key={c} onClick={() => setCatAtiva(c)}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-colors whitespace-nowrap border ${catAtiva === c ? 'bg-[var(--primary)] text-black border-[var(--primary)]' : 'bg-black text-zinc-500 border-white/5 hover:border-white/20 hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE PRODUTOS (Tags HTML normais para máxima performance) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-[var(--primary)]/30 transition-colors group flex flex-col">
              <div className="h-52 bg-black relative overflow-hidden flex items-center justify-center">
                {p.image ? (
                   <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt={p.name} />
                ) : (
                   <Package className="w-10 h-10 text-zinc-800" />
                )}
                <div className="absolute top-3 right-3 bg-black px-3 py-1 rounded-full text-[9px] font-black uppercase text-[var(--primary)] border border-white/10 shadow-lg">
                  {p.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-black text-xl text-white mb-1 uppercase tracking-tight truncate">{p.name}</h3>
                <p className="text-zinc-500 text-[11px] mb-6 line-clamp-2 leading-relaxed">{p.description}</p>
                
                {/* RODAPÉ DO CARD - Corrigido o esmagamento */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                   <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Valor</span>
                      <p className="text-2xl font-black text-white truncate">R$ {p.price.toFixed(2)}</p>
                   </div>
                   <div className="flex gap-2 shrink-0">
                      <button onClick={() => setViewProduct(p)} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-zinc-400">
                         <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => addToCart(p.id)} className="p-3 bg-[var(--primary)] text-black rounded-xl hover:opacity-80 transition-opacity">
                         <Plus className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARRINHO FLUTUANTE (Mantido com AnimatePresence pois é um elemento único) */}
      <AnimatePresence>
        {totalItens > 0 && (
          <motion.button 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-6 right-6 bg-[var(--primary)] text-black pl-6 pr-3 py-3 rounded-2xl font-black shadow-2xl flex items-center gap-4 z-40 transition-transform active:scale-95 border-2 border-black"
          >
            <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] uppercase opacity-60 mb-1">Ver Pedido</span>
                <span className="text-lg tracking-tighter">R$ {totalGeral.toFixed(2)}</span>
            </div>
            <div className="bg-black text-white w-10 h-10 rounded-xl flex items-center justify-center relative">
                <ShoppingCart className="w-4 h-4" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-black">{totalItens}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* DRAWER DO CARRINHO (Animação Tween mais suave) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/80 z-[100]" />
            <motion.aside 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }} 
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/5 z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black">
                <h2 className="text-xl font-black uppercase tracking-tighter">Carrinho</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500"><X className="w-5 h-5"/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartDetails.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-black p-3 rounded-2xl border border-white/5">
                    <div className="w-12 h-12 bg-[#050505] rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/5">
                      {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <Package className="w-6 h-6 text-zinc-800" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-xs text-white uppercase truncate mb-1">{item.name}</p>
                      <p className="text-[11px] font-bold text-[var(--primary)]">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#050505] px-2 py-1 rounded-lg border border-white/5 shrink-0">
                        <button onClick={() => removeFromCart(item.id)} className="p-1 text-zinc-500 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-black w-4 text-center">{item.qtd}</span>
                        <button onClick={() => addToCart(item.id)} className="p-1 text-zinc-500 hover:text-[var(--primary)] transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeTotal(item.id)} className="p-2 text-zinc-700 hover:text-red-500 transition-colors shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-black border-t border-white/5 space-y-4">
                <div className="flex justify-between items-end pb-2">
                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Total da Compra</span>
                    <span className="text-3xl font-black text-white tracking-tighter">R$ {totalGeral.toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleGeneratePix} 
                  disabled={checkoutLoading || cart.length === 0}
                  className="w-full bg-[var(--primary)] hover:brightness-110 text-black font-black py-6 rounded-2xl text-lg border-none shadow-xl transition-all flex justify-center"
                >
                  {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : "PAGAR VIA PIX"}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MODAL PIX */}
      <AnimatePresence>
        {checkoutStep === "pix" && pixData && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <div onClick={() => setCheckoutStep("none")} className="absolute inset-0 bg-black/90" />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
                    <button onClick={() => setCheckoutStep("none")} className="absolute top-4 right-4 text-zinc-500 hover:text-white"><X className="w-5 h-5"/></button>
                    <Smartphone className="w-8 h-8 text-[var(--primary)] mx-auto mb-6 animate-pulse" />
                    <h3 className="text-2xl font-black mb-1 uppercase tracking-tighter text-white">Checkout PIX</h3>
                    <p className="text-zinc-500 font-medium mb-6 text-[11px] uppercase">Escaneie pelo app do seu banco</p>
                    
                    <div className="bg-white p-3 rounded-2xl mb-6 flex justify-center border-4 border-white/5 shadow-inner">
                        <img 
                          src={`data:image/jpeg;base64,${pixData.qrCodeBase64}`} 
                          alt="QR Code PIX"
                          className="w-48 h-48 object-contain rounded-xl"
                        />
                    </div>
                    
                    <Button onClick={handleCopyPix} className="w-full bg-[#111] hover:bg-[#222] text-white border border-white/10 py-6 rounded-xl font-black text-xs mb-3 uppercase">
                        <Copy className="w-4 h-4 mr-2" /> Copiar Código PIX
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest mt-2">
                        <Loader2 className="w-3 h-3 animate-spin" /> Aguardando Pagamento
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* MODAL DETALHES */}
      <AnimatePresence>
        {viewProduct && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div onClick={() => setViewProduct(null)} className="absolute inset-0 bg-black/80" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl">
                    <button onClick={() => setViewProduct(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white"><X className="w-5 h-5"/></button>
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-[var(--primary)] mb-6 border border-white/5 shadow-inner">
                        {ICON_MAP[viewProduct.icon] || <Gem className="w-6 h-6" />}
                    </div>
                    <h2 className="text-3xl font-black mb-3 uppercase tracking-tighter leading-tight text-white">{viewProduct.name}</h2>
                    <p className="text-zinc-400 font-medium mb-8 leading-relaxed text-sm">{viewProduct.description}</p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black p-4 rounded-2xl border border-white/5 gap-4">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold uppercase text-zinc-500">Valor</span>
                           <p className="text-3xl font-black text-white tracking-tighter">R$ {viewProduct.price.toFixed(2)}</p>
                        </div>
                        <Button onClick={() => { addToCart(viewProduct.id); setViewProduct(null); }} className="w-full sm:w-auto bg-[var(--primary)] hover:brightness-110 text-black font-black py-6 px-8 rounded-xl border-none transition-all active:scale-95">
                            ADICIONAR
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}