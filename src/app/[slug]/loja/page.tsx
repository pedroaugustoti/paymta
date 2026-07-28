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
import Image from "next/image";

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

interface ShopConfig {
  serverName?: string;
  slogan?: string;
  heroImageUrl?: string;
  primaryColor?: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  gem: <Gem className="w-8 h-8 text-cyan-400" />,
  dollar: <DollarSign className="w-8 h-8 text-emerald-400" />,
  zap: <Zap className="w-8 h-8 text-orange-400" />,
};

export default function LojaVipPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<ShopConfig | null>(null);
  
  const [search, setSearch] = useState("");
  const [catAtiva, setCatAtiva] = useState("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Produto | null>(null);
  
  const [checkoutStep, setCheckoutStep] = useState<"none" | "pix">("none");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qrCodeBase64: string, copiaECola: string } | null>(null);
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) return (
    <div className="h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#030303]">
      <Loader2 className="w-10 h-10 animate-spin text-zinc-600" />
      <span className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px] italic">Acessando Catálogo...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[var(--primary)] selection:text-black pb-24" style={{ "--primary": settings?.primaryColor || "#facb11" } as React.CSSProperties}>
      
      {/* HERO SECTION DA LOJA */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#050505]">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 scale-105"
            style={{ backgroundImage: `url(${settings?.heroImageUrl || ""})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-10 pointer-events-none" />
         
         <div className="relative z-10 text-center px-6 pt-10">
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-2 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent drop-shadow-2xl">
               LOJA VIP
            </h1>
            <p className="text-[var(--primary)] font-black uppercase tracking-[0.4em] text-[10px] py-2 px-6 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 inline-block backdrop-blur-md shadow-[0_0_20px_rgba(250,203,17,0.15)]">
              {settings?.slogan || "Adquira suas vantagens"}
            </p>
         </div>
      </section>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (Filtros e Grid) */}
      <div className="p-6 max-w-7xl mx-auto w-full relative z-20 -mt-8">
        
        {/* BUSCA E FILTROS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-black/40 backdrop-blur-xl p-4 md:p-6 rounded-[32px] border border-white/10 shadow-2xl">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" placeholder="Buscar pacotes..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-[var(--primary)]/50 outline-none transition-all text-white placeholder:text-zinc-600 italic font-medium shadow-inner"
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto scrollbar-hide py-2 px-1">
            {categoriasDisponiveis.map((c) => (
              <button 
                key={c} onClick={() => setCatAtiva(c)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border italic ${
                  catAtiva === c 
                  ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-[0_0_20px_var(--primary)] shadow-[var(--primary)]/20 scale-105' 
                  : 'bg-[#0a0a0a] text-zinc-500 border-white/5 hover:border-[var(--primary)]/30 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE PRODUTOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="bg-[#09090b] border border-white/5 rounded-[32px] overflow-hidden hover:border-[var(--primary)]/40 transition-all duration-500 group flex flex-col shadow-xl hover:shadow-[0_0_30px_rgba(250,203,17,0.1)] relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              <div className="h-48 bg-black relative overflow-hidden flex items-center justify-center">
                {p.image ? (
                   <Image 
                      src={p.image} 
                      alt={p.name} 
                      fill 
                      unoptimized 
                      className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                   />
                ) : (
                   <Package className="w-12 h-12 text-zinc-800 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                )}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase text-[var(--primary)] border border-[var(--primary)]/20 shadow-lg italic tracking-widest z-20">
                  {p.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-white/[0.02]">
                <h3 className="font-black text-xl text-white mb-2 uppercase tracking-tighter truncate italic group-hover:text-[var(--primary)] transition-colors">{p.name}</h3>
                <p className="text-zinc-500 text-xs mb-6 line-clamp-2 leading-relaxed font-medium italic">{p.description}</p>
                
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                   <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] leading-none mb-1">Valor</span>
                      <p className="text-2xl font-black text-white truncate tracking-tighter italic">R$ {p.price.toFixed(2)}</p>
                   </div>
                   <div className="flex gap-2 shrink-0">
                      <button onClick={() => setViewProduct(p)} className="p-3.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-zinc-400 border border-white/5 hover:text-white">
                         <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => addToCart(p.id)} className="p-3.5 bg-[var(--primary)] text-black rounded-2xl hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-[var(--primary)]/20">
                         <Plus className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARRINHO FLUTUANTE (SMART FAB) */}
      <AnimatePresence>
        {totalItens > 0 && (
          <motion.button 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-6 md:right-8 bg-[var(--primary)] text-black pl-8 pr-4 py-4 rounded-[28px] font-black shadow-[0_20px_40px_rgba(250,203,17,0.3)] flex items-center gap-5 z-40 transition-transform active:scale-95 border-4 border-[#030303] group hover:pr-5"
          >
            <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] uppercase tracking-widest opacity-70 mb-1.5 italic font-black">Ver Pedido</span>
                <span className="text-xl tracking-tighter italic">R$ {totalGeral.toFixed(2)}</span>
            </div>
            <div className="bg-black text-white w-12 h-12 rounded-[18px] flex items-center justify-center relative shadow-inner group-hover:rotate-12 transition-transform">
                <ShoppingCart className="w-5 h-5 text-[var(--primary)]" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-black">{totalItens}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* DRAWER DO CARRINHO (SIDEBAR) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
            <motion.aside 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} 
              transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }} 
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#050505] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
            >
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-md">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">Seu Carrinho</h2>
                  <p className="text-[10px] text-[var(--primary)] uppercase tracking-widest font-bold mt-1">Confira seus itens</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-zinc-400 border border-white/5"><X className="w-5 h-5"/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {cartDetails.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-3xl border border-white/5 group hover:border-white/10 transition-colors">
                    <div className="w-16 h-16 bg-black rounded-2xl overflow-hidden shrink-0 flex items-center justify-center border border-white/5 relative">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill unoptimized className="object-cover opacity-80 group-hover:opacity-100" />
                      ) : (
                        <Package className="w-8 h-8 text-zinc-800 relative z-10" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-white uppercase truncate mb-1 italic tracking-tight">{item.name}</p>
                      <p className="text-xs font-black text-[var(--primary)] tracking-tighter">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button onClick={() => removeTotal(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      <div className="flex items-center gap-2 bg-black px-2 py-1.5 rounded-xl border border-white/10">
                          <button onClick={() => removeFromCart(item.id)} className="p-1 text-zinc-500 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-black w-4 text-center italic">{item.qtd}</span>
                          <button onClick={() => addToCart(item.id)} className="p-1 text-zinc-500 hover:text-[var(--primary)] transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {cartDetails.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-full text-center opacity-50 pt-20">
                     <ShoppingCart className="w-16 h-16 mb-4 text-zinc-600" />
                     <p className="text-lg font-black uppercase italic tracking-tighter">Carrinho Vazio</p>
                     <p className="text-[10px] uppercase tracking-widest font-bold mt-2">Adicione itens da loja</p>
                   </div>
                )}
              </div>

              <div className="p-6 md:p-8 bg-black/40 backdrop-blur-md border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end pb-4 border-b border-white/5">
                    <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] italic">Total do Pedido</span>
                    <span className="text-4xl font-black text-white tracking-tighter italic">R$ {totalGeral.toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleGeneratePix} 
                  disabled={checkoutLoading || cart.length === 0}
                  className="w-full bg-[var(--primary)] hover:brightness-110 text-black font-black py-7 rounded-2xl text-sm border-none shadow-[0_10px_30px_rgba(250,203,17,0.2)] transition-all flex justify-center uppercase tracking-widest italic"
                >
                  {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : "FINALIZAR VIA PIX"}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MODAL PIX CHECKOUT */}
      <AnimatePresence>
        {checkoutStep === "pix" && pixData && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                <div onClick={() => setCheckoutStep("none")} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-[40px] max-w-sm w-full text-center shadow-2xl">
                    <button onClick={() => setCheckoutStep("none")} className="absolute top-6 right-6 text-zinc-500 hover:text-white bg-white/5 p-2 rounded-xl"><X className="w-5 h-5"/></button>
                    
                    <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-3xl mx-auto flex items-center justify-center mb-6 border border-[var(--primary)]/20 shadow-inner">
                        <Smartphone className="w-10 h-10 text-[var(--primary)] animate-pulse" />
                    </div>
                    
                    <h3 className="text-3xl font-black mb-1 uppercase tracking-tighter text-white italic">Checkout</h3>
                    <p className="text-zinc-500 font-bold mb-8 text-[10px] uppercase tracking-[0.2em]">Escaneie para pagar</p>
                    
                    <div className="bg-white p-4 rounded-3xl mb-8 flex justify-center border-4 border-white/5 shadow-inner mx-auto w-fit">
                        <Image 
                          src={`data:image/jpeg;base64,${pixData.qrCodeBase64}`} 
                          alt="QR Code PIX"
                          width={192}
                          height={192}
                          unoptimized
                          className="object-contain rounded-xl"
                        />
                    </div>
                    
                    <Button onClick={handleCopyPix} className="w-full bg-[#111] hover:bg-[#222] text-white border border-white/10 py-7 rounded-2xl font-black text-xs mb-4 uppercase tracking-widest italic group">
                        {copied ? <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500" /> : <Copy className="w-5 h-5 mr-3 text-zinc-500 group-hover:text-white transition-colors" />} 
                        {copied ? "Copiado!" : "Copiar Código PIX"}
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-[var(--primary)] text-[10px] font-black uppercase tracking-widest mt-4 italic">
                        <Loader2 className="w-3 h-3 animate-spin" /> Aguardando Pagamento
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* MODAL DETALHES DE PRODUTO */}
      <AnimatePresence>
        {viewProduct && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div onClick={() => setViewProduct(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-[40px] max-w-md w-full shadow-2xl overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
                    
                    <button onClick={() => setViewProduct(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white bg-white/5 p-2 rounded-xl transition-colors"><X className="w-5 h-5"/></button>
                    
                    <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-[var(--primary)] mb-6 border border-white/5 shadow-inner">
                        {ICON_MAP[viewProduct.icon] || <Gem className="w-8 h-8" />}
                    </div>
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 block italic">{viewProduct.category}</span>
                    <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter leading-tight text-white italic">{viewProduct.name}</h2>
                    <p className="text-zinc-400 font-medium mb-10 leading-relaxed text-sm italic">{viewProduct.description}</p>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-black p-5 rounded-3xl border border-white/5 gap-6">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Valor Unitário</span>
                           <p className="text-4xl font-black text-white tracking-tighter italic">R$ {viewProduct.price.toFixed(2)}</p>
                        </div>
                        <Button onClick={() => { addToCart(viewProduct.id); setViewProduct(null); }} className="w-full sm:w-auto bg-[var(--primary)] hover:brightness-110 text-black font-black py-7 px-8 rounded-2xl border-none transition-all active:scale-95 shadow-[0_10px_30px_rgba(250,203,17,0.2)] tracking-widest uppercase italic">
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