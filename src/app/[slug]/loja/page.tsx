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

// Interfaces para tipagem
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

  // 1. ESTADOS GERAIS
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);
  
  const [search, setSearch] = useState("");
  const [catAtiva, setCatAtiva] = useState("todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<Produto | null>(null);
  
  // 2. ESTADOS DE CHECKOUT (PIX)
  const [checkoutStep, setCheckoutStep] = useState<"none" | "pix">("none");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qrCodeBase64: string, copiaECola: string } | null>(null);

  // 3. BUSCA DADOS DO BANCO
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

  // 4. LÓGICA DAS CATEGORIAS DINÂMICAS
  const categoriasDisponiveis = useMemo(() => {
    if (produtos.length === 0) return ["todos"];
    const unicas = Array.from(new Set(produtos.map((p) => p.category.toLowerCase())));
    return ["todos", ...unicas];
  }, [produtos]);

  // 5. LÓGICA DO CARRINHO (Sem lag)
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

  // =================================================================
  // 6. INTEGRAÇÃO DE PAGAMENTO (Geração Dinâmica Mercado Pago)
  // =================================================================
  const handleGeneratePix = async () => {
    setCheckoutLoading(true);
    try {
      // Aqui faremos a chamada para a nossa futura API de Checkout
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, items: cartDetails, total: totalGeral })
      });

      if (!res.ok) throw new Error("Falha ao gerar o PIX");

      const data = await res.json();
      
      // Recebe o QR Code Base64 e o texto Copia e Cola da API
      setPixData({
        qrCodeBase64: data.qr_code_base64,
        copiaECola: data.qr_code
      });
      
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
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-black">
      <Loader2 className="w-10 h-10 animate-spin text-yellow-500" />
      <span className="text-zinc-500 font-black uppercase italic">Sincronizando Host...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white" style={{ "--primary": settings?.primaryColor || "#facb11" } as any}>
      {/* HEADER / HERO */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
         <img src={settings?.heroImageUrl || ""} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale" alt="Banner" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
         <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-4 drop-shadow-2xl">
               {settings?.serverName || "MTA SHOP"}
            </h1>
            <p className="text-[var(--primary)] font-bold uppercase tracking-[0.3em] text-xs italic">
              {settings?.slogan || "Sua nova vida começa aqui"}
            </p>
         </div>
      </section>

      <div className="p-8 max-w-7xl mx-auto w-full -mt-20 relative z-20">
        
        {/* BUSCA E FILTROS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-zinc-950/80 backdrop-blur-xl p-6 rounded-[32px] border border-white/5">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" placeholder="Procurar produtos..." 
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:border-[var(--primary)] outline-none transition-all"
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-black rounded-2xl border border-white/5 overflow-x-auto w-full md:w-auto scrollbar-hide">
            {categoriasDisponiveis.map((c) => (
              <button 
                key={c} onClick={() => setCatAtiva(c)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${catAtiva === c ? 'bg-[var(--primary)] text-black shadow-lg' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE PRODUTOS - O Lag foi resolvido removendo o layout prop aqui */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <motion.div key={p.id} className="bg-zinc-950 border border-white/5 rounded-[40px] overflow-hidden hover:border-[var(--primary)]/40 transition-all group flex flex-col shadow-2xl">
              <div className="h-56 bg-zinc-900 relative overflow-hidden">
                {p.image ? (
                   <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-zinc-900/50">
                      <Package className="w-12 h-12 text-zinc-800" />
                   </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-[var(--primary)] border border-[var(--primary)]/20">
                  {p.category}
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-black text-xl text-white mb-2 uppercase italic leading-tight tracking-tighter">{p.name}</h3>
                <p className="text-zinc-500 text-xs mb-8 line-clamp-2 leading-relaxed">{p.description}</p>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">Preço</span>
                      <p className="text-3xl font-black text-white italic tracking-tighter">R$ {p.price.toFixed(2)}</p>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => setViewProduct(p)} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-zinc-400">
                         <Eye className="w-5 h-5" />
                      </button>
                      <button onClick={() => addToCart(p.id)} className="p-3 bg-[var(--primary)] text-black rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/20">
                         <Plus className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CARRINHO FLUTUANTE */}
      <AnimatePresence>
        {totalItens > 0 && (
          <motion.button 
            initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-8 bg-[var(--primary)] text-black pl-8 pr-4 py-4 rounded-3xl font-black shadow-2xl flex items-center gap-6 z-40 group hover:scale-105 transition-transform"
          >
            <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] uppercase opacity-60 mb-1">Checkout</span>
                <span className="text-xl italic tracking-tighter">R$ {totalGeral.toFixed(2)}</span>
            </div>
            <div className="bg-black text-white w-12 h-12 rounded-2xl flex items-center justify-center relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[var(--primary)] font-black">{totalItens}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* DRAWER DO CARRINHO */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#080808] border-l border-white/5 z-[101] flex flex-col shadow-2xl">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Meu Pedido</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-xl transition-colors"><X /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cartDetails.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-[24px] border border-white/5">
                    <div className="w-12 h-12 bg-black rounded-xl overflow-hidden shrink-0">
                      {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <Package className="w-full h-full p-3 text-zinc-800" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-sm text-white uppercase italic leading-none mb-1">{item.name}</p>
                      <p className="text-xs font-bold text-[var(--primary)] italic">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <button onClick={() => removeFromCart(item.id)} className="hover:text-[var(--primary)] transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-black w-4 text-center">{item.qtd}</span>
                        <button onClick={() => addToCart(item.id)} className="hover:text-[var(--primary)] transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeTotal(item.id)} className="text-zinc-700 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-black/40 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                    <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest italic">Total Final</span>
                    <span className="text-4xl font-black italic text-white tracking-tighter">R$ {totalGeral.toFixed(2)}</span>
                </div>
                
                {/* BOTÃO QUE CHAMA A API DO MERCADO PAGO */}
                <Button 
                  onClick={handleGeneratePix} 
                  disabled={checkoutLoading || cart.length === 0}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-black py-8 rounded-[32px] text-xl border-none shadow-lg shadow-emerald-500/10 transition-all flex justify-center"
                >
                  {checkoutLoading ? <Loader2 className="w-6 h-6 animate-spin text-black" /> : "PAGAR VIA PIX"}
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MODAL PIX - Agora recebendo dados REAIS da API */}
      <AnimatePresence>
        {checkoutStep === "pix" && pixData && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
                <div onClick={() => setCheckoutStep("none")} className="absolute inset-0 bg-black/98 backdrop-blur-xl" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#0c0c0c] border border-white/10 p-10 rounded-[48px] max-w-sm w-full text-center shadow-3xl">
                    <Smartphone className="w-10 h-10 text-emerald-400 mx-auto mb-8 animate-bounce" />
                    <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">Checkout PIX</h3>
                    <p className="text-zinc-500 font-medium mb-8 text-xs uppercase">Escaneie para liberar seus itens no MTA.</p>
                    
                    <div className="bg-white p-4 rounded-[32px] mb-8 shadow-xl">
                        {/* Imagem Real do QR Code */}
                        <img 
                          src={`data:image/jpeg;base64,${pixData.qrCodeBase64}`} 
                          alt="QR Code PIX"
                          className="w-full aspect-square rounded-2xl"
                        />
                    </div>
                    
                    <Button onClick={handleCopyPix} variant="outline" className="w-full border-white/5 bg-white/5 py-7 rounded-2xl font-black text-sm mb-4 uppercase italic">
                        <Copy className="w-4 h-4 mr-2" /> Copiar Código PIX
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest italic">
                        <CheckCircle2 className="w-4 h-4 animate-pulse" /> Aguardando Pagamento...
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* MODAL DETALHES */}
      <AnimatePresence>
        {viewProduct && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                <div onClick={() => setViewProduct(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-[#080808] border border-white/10 p-10 rounded-[56px] max-w-lg w-full shadow-3xl">
                    <button onClick={() => setViewProduct(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X /></button>
                    <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center text-[var(--primary)] mb-8 border border-[var(--primary)]/20 shadow-inner">
                        {ICON_MAP[viewProduct.icon] || <Gem className="w-8 h-8" />}
                    </div>
                    <h2 className="text-5xl font-black mb-4 uppercase italic tracking-tighter leading-none">{viewProduct.name}</h2>
                    <p className="text-zinc-500 font-medium mb-12 leading-relaxed text-sm">{viewProduct.description}</p>
                    <div className="flex items-center justify-between bg-white/5 p-6 rounded-[32px] border border-white/5">
                        <p className="text-4xl font-black text-white italic tracking-tighter">R$ {viewProduct.price.toFixed(2)}</p>
                        <Button onClick={() => { addToCart(viewProduct.id); setViewProduct(null); }} className="bg-[var(--primary)] text-black font-black py-8 px-10 rounded-[24px] border-none shadow-2xl transition-all active:scale-95 italic">
                            ADICIONAR AGORA
                        </Button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}