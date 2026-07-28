"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ShoppingCart, Plus, Minus, X, 
  Gem, DollarSign, Zap, Trash2, 
  Smartphone, Copy, CheckCircle2, Loader2, Package, Filter, Check
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
  
  // Estados de Filtro
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Estados de Carrinho e Checkout
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  // Extrair categorias únicas
  const categoriasDisponiveis = useMemo(() => {
    if (produtos.length === 0) return [];
    return Array.from(new Set(produtos.map((p) => p.category)));
  }, [produtos]);

  // Lógica de toggle de categoria
  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Filtragem Mestre
  const filtered = useMemo(() => {
    return produtos.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      
      const price = p.price;
      const min = minPrice === "" ? 0 : parseFloat(minPrice);
      const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);
      const matchPrice = price >= min && price <= max;

      return matchSearch && matchCat && matchPrice;
    });
  }, [produtos, search, selectedCategories, minPrice, maxPrice]);

  // Lógica do Carrinho
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
      setIsCartOpen(false); // Fecha o carrinho ao abrir o PIX
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
      
      {/* HERO SECTION COMPACTA */}
      <section className="relative h-[30vh] md:h-[35vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-[#050505]">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url(${settings?.heroImageUrl || ""})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
         
         <div className="relative z-10 text-center px-6 pt-10">
            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-2 text-white drop-shadow-2xl">
               LOJA VIP
            </h1>
            <p className="text-[var(--primary)] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
              {settings?.slogan || "Adquira suas vantagens in-game"}
            </p>
         </div>
      </section>

      {/* LAYOUT PRINCIPAL: SIDEBAR + GRID */}
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-8 relative z-20">
        
        {/* BOTÃO FILTROS MOBILE */}
        <div className="lg:hidden flex items-center justify-between mb-2">
          <Button 
            onClick={() => setIsMobileFilterOpen(true)}
            variant="outline" 
            className="bg-[#0a0a0a] border-white/10 text-white font-bold uppercase tracking-widest text-xs px-6 py-5 rounded-2xl flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filtros
          </Button>
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{filtered.length} pacotes</span>
        </div>

        {/* SIDEBAR DE FILTROS (DESKTOP + MOBILE DRAWER) */}
        <aside className={`
          ${isMobileFilterOpen ? 'fixed inset-y-0 left-0 w-[80%] max-w-sm z-[110] bg-[#050505] p-6 shadow-2xl overflow-y-auto border-r border-white/10 transition-transform translate-x-0' : 'fixed inset-y-0 left-0 w-[80%] max-w-sm z-[110] bg-[#050505] p-6 shadow-2xl overflow-y-auto border-r border-white/10 transition-transform -translate-x-full lg:static lg:translate-x-0 lg:w-64 lg:p-0 lg:bg-transparent lg:border-none lg:shadow-none lg:overflow-visible lg:block lg:shrink-0'}
        `}>
          <div className="flex items-center justify-between lg:mb-8 mb-10">
            <h2 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter">Filtros</h2>
            <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden p-2 text-zinc-500 hover:text-white"><X className="w-5 h-5"/></button>
          </div>

          {/* SESSÃO: PREÇO */}
          <div className="mb-10 bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-[24px]">
            <h3 className="text-xs font-black uppercase text-zinc-500 tracking-[0.2em] mb-4">Preço</h3>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px] font-bold">R$</span>
                <input 
                  type="number" 
                  placeholder="Mín" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white focus:border-[var(--primary)] outline-none transition-colors"
                />
              </div>
              <span className="text-zinc-600">-</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px] font-bold">R$</span>
                <input 
                  type="number" 
                  placeholder="Máx" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl pl-8 pr-3 py-3 text-xs text-white focus:border-[var(--primary)] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SESSÃO: CATEGORIAS */}
          <div className="bg-[#0a0a0a] border border-white/5 p-5 md:p-6 rounded-[24px]">
            <h3 className="text-xs font-black uppercase text-zinc-500 tracking-[0.2em] mb-4">Categorias</h3>
            <div className="space-y-3">
              {categoriasDisponiveis.map(cat => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                      isSelected 
                      ? 'bg-[var(--primary)] border-[var(--primary)]' 
                      : 'bg-black border-white/20 group-hover:border-[var(--primary)]/50'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                    </div>
                    <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                      {cat}
                    </span>
                  </label>
                )
              })}
              {categoriasDisponiveis.length === 0 && (
                <p className="text-xs text-zinc-600 italic">Nenhuma categoria.</p>
              )}
            </div>
          </div>
        </aside>

        {/* OVERLAY MOBILE PARA FILTRO */}
        {isMobileFilterOpen && (
          <div onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-black/80 z-[105] lg:hidden" />
        )}

        {/* ÁREA DE PRODUTOS */}
        <div className="flex-1 w-full min-w-0">
          
          {/* BARRA DE PESQUISA TOPO */}
          <div className="relative w-full mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Pesquisar produtos..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-[24px] pl-14 pr-6 py-5 text-sm focus:border-[var(--primary)] outline-none transition-all text-white placeholder:text-zinc-600 italic font-medium shadow-inner"
            />
          </div>

          {/* GRID COM O NOVO DESIGN ESTILO REFERÊNCIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div 
                key={p.id} 
                className="bg-[#09090b] border border-white/5 rounded-[24px] overflow-hidden group flex flex-col relative transition-all duration-500 hover:-translate-y-1"
              >
                {/* EFEITOS NEON (Canto Sup Esq e Inf Dir) */}
                <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-[var(--primary)] to-transparent opacity-50 group-hover:w-full transition-all duration-700 z-10" />
                <div className="absolute bottom-0 right-0 w-16 h-[2px] bg-gradient-to-l from-[var(--primary)] to-transparent opacity-50 group-hover:w-full transition-all duration-700 z-10" />

                {/* ÁREA DA IMAGEM */}
                <div className="h-56 bg-black relative flex items-center justify-center p-6 border-b border-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_60%)] opacity-5 group-hover:opacity-15 transition-opacity duration-500" />
                  
                  {p.image ? (
                    <Image 
                      src={p.image} 
                      alt={p.name} 
                      fill 
                      unoptimized 
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 relative z-10" 
                    />
                  ) : (
                    <div className="relative z-10 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                      {ICON_MAP[p.icon] || <Package className="w-16 h-16 text-zinc-700" />}
                    </div>
                  )}

                  {/* BADGE CATEGORIA */}
                  <span className="absolute top-4 left-4 bg-[#0a0a0a]/80 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase text-zinc-400 border border-white/10 tracking-widest z-20">
                    {p.category}
                  </span>
                </div>

                {/* CONTEÚDO E BOTÃO */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-xl text-white mb-2 uppercase tracking-tight truncate group-hover:text-[var(--primary)] transition-colors">{p.name}</h3>
                    <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed font-medium">{p.description}</p>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                     <p className="text-3xl font-black text-white tracking-tighter italic">
                       R$ {p.price.toFixed(2)}
                     </p>
                     
                     {/* BOTÃO FULL WIDTH ESTILO REFERÊNCIA */}
                     <Button 
                       onClick={() => addToCart(p.id)} 
                       className="w-full bg-[var(--primary)] hover:brightness-110 text-black font-black uppercase tracking-widest text-xs py-6 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(250,203,17,0.1)] group-hover:shadow-[0_0_30px_rgba(250,203,17,0.25)] border-none"
                     >
                        Comprar Agora
                     </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center bg-[#0a0a0a] rounded-[32px] border border-dashed border-white/10">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Nenhum pacote encontrado.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CARRINHO FLUTUANTE (SMART FAB) */}
      <AnimatePresence>
        {totalItens > 0 && (
          <motion.button 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-6 md:right-8 bg-[var(--primary)] text-black p-4 rounded-full font-black shadow-[0_10px_40px_rgba(250,203,17,0.4)] flex items-center justify-center z-40 transition-transform active:scale-95 border-4 border-[#030303] hover:scale-105"
          >
            <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full font-black border-2 border-black">{totalItens}</span>
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
              </div>

              <div className="p-6 md:p-8 bg-black/40 backdrop-blur-md border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end pb-4 border-b border-white/5">
                    <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] italic">Total</span>
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
    </div>
  );
}