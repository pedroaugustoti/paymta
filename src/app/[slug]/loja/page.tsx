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
  const [viewProduct, setViewProduct] = useState<Produto | null>(null);

  // Carregamento de Configurações
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

  // PREVENÇÃO DE STUTTERING (TRAVA O SCROLL QUANDO MODAIS ESTÃO ABERTOS)
  useEffect(() => {
    if (isCartOpen || checkoutStep !== "none" || viewProduct !== null || isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen, checkoutStep, viewProduct, isMobileFilterOpen]);

  // Lógica de Filtros
  const categoriasDisponiveis = useMemo(() => {
    if (produtos.length === 0) return [];
    return Array.from(new Set(produtos.map((p) => p.category)));
  }, [produtos]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

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

  // Integração PIX
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
      setIsCartOpen(false); 
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
      
      {/* HERO SECTION COMPACTA E LIMPA */}
      <section className="relative h-[25vh] md:h-[35vh] flex items-center justify-center overflow-hidden border-b border-white/5 bg-black">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${settings?.heroImageUrl || ""})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
         
         <div className="relative z-10 text-center px-6 pt-8">
            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-2 text-white drop-shadow-2xl">
               LOJA VIP
            </h1>
            <p className="text-[var(--primary)] font-black uppercase tracking-[0.4em] text-[9px] md:text-[11px]" style={{ textShadow: "0 0 15px color-mix(in srgb, var(--primary) 50%, transparent)" }}>
              {settings?.slogan || "ONDE SUA HISTÓRIA DE SUCESSO GANHA VIDA."}
            </p>
         </div>
      </section>

      {/* LAYOUT PRINCIPAL: SIDEBAR + GRID MODERNO */}
      <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 py-10 flex flex-col lg:flex-row gap-10 relative z-20">
        
        {/* BOTÃO FILTROS MOBILE */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <Button 
            onClick={() => setIsMobileFilterOpen(true)}
            variant="outline" 
            className="bg-[#0a0a0a] border-white/10 text-white font-bold uppercase tracking-widest text-xs px-6 py-5 rounded-xl flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filtros
          </Button>
          <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{filtered.length} PACOTES</span>
        </div>

        {/* SIDEBAR DE FILTROS: DESIGN LIMPO */}
        <aside className={`
          ${isMobileFilterOpen ? 'fixed inset-y-0 left-0 w-[85%] max-w-sm z-[110] bg-[#050505] p-6 shadow-2xl overflow-y-auto border-r border-white/10 transition-transform translate-x-0' : 'fixed inset-y-0 left-0 w-[85%] max-w-sm z-[110] bg-[#050505] p-6 shadow-2xl overflow-y-auto border-r border-white/10 transition-transform -translate-x-full lg:static lg:translate-x-0 lg:w-64 lg:p-0 lg:bg-transparent lg:border-none lg:shadow-none lg:overflow-visible lg:block lg:shrink-0'}
        `}>
          <div className="flex items-center justify-between lg:mb-8 mb-10">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Filtros</h2>
            <button onClick={() => setIsMobileFilterOpen(false)} className="lg:hidden p-2 text-zinc-500 hover:text-white"><X className="w-5 h-5"/></button>
          </div>

          {/* SESSÃO: PREÇO TOTALMENTE REFEITO (SEM SETINHAS) */}
          <div className="mb-10">
            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 pl-1">Faixa de Preço</h3>
            
            {/* Visual de barra de slider falso para estética */}
            <div className="w-full h-1 bg-white/5 rounded-full mb-5 relative">
               <div className="absolute left-[10%] right-[10%] h-full bg-[var(--primary)]/50 rounded-full" />
               <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--primary)] rounded-full" style={{ boxShadow: "0 0 10px var(--primary)" }} />
               <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--primary)] rounded-full" style={{ boxShadow: "0 0 10px var(--primary)" }} />
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px] font-black group-hover:text-[var(--primary)] transition-colors">R$</span>
                <input 
                  type="number" 
                  placeholder="Mín" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-3 py-3.5 text-xs text-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/50 focus:bg-[var(--primary)]/5 outline-none transition-all font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <span className="text-zinc-600 font-black">-</span>
              <div className="relative flex-1 group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 text-[10px] font-black group-hover:text-[var(--primary)] transition-colors">R$</span>
                <input 
                  type="number" 
                  placeholder="Máx" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-3 py-3.5 text-xs text-white focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]/50 focus:bg-[var(--primary)]/5 outline-none transition-all font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          {/* SESSÃO: CATEGORIAS INTERATIVA E CLICÁVEL */}
          <div>
            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4 pl-1">Categorias</h3>
            <div className="flex flex-col gap-2">
              {categoriasDisponiveis.map(cat => {
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button 
                    key={cat} 
                    onClick={() => toggleCategory(cat)}
                    className="flex items-center gap-4 w-full p-2.5 rounded-xl transition-all hover:bg-white/5 group text-left"
                  >
                    <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-300 shrink-0 ${
                      isSelected 
                      ? 'bg-[var(--primary)] border-[var(--primary)]' 
                      : 'bg-[#0a0a0a] border-white/20 group-hover:border-[var(--primary)]/50'
                    }`} style={isSelected ? { boxShadow: "0 0 10px color-mix(in srgb, var(--primary) 40%, transparent)" } : {}}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-black font-black" />}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider transition-colors truncate ${isSelected ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                      {cat}
                    </span>
                  </button>
                )
              })}
              {categoriasDisponiveis.length === 0 && (
                <p className="text-xs text-zinc-600 italic px-3">Nenhuma categoria.</p>
              )}
            </div>
          </div>
        </aside>

        {/* OVERLAY MOBILE PARA FILTRO */}
        {isMobileFilterOpen && (
          <div onClick={() => setIsMobileFilterOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[105] lg:hidden" />
        )}

        {/* ÁREA DE PRODUTOS: GRID NEON/TECH */}
        <div className="flex-1 w-full min-w-0">
          
          {/* BARRA DE PESQUISA TOPO */}
          <div className="relative w-full mb-10">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Pesquisar pacotes..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-sm focus:border-[var(--primary)]/50 focus:ring-1 focus:ring-[var(--primary)]/20 outline-none transition-all text-white placeholder:text-zinc-600 font-medium shadow-inner"
            />
          </div>

          {/* GRID COM O NOVO DESIGN REFERÊNCIA (Bordas Neon e Botão Full Width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div 
                key={p.id} 
                className="bg-[#050505] border border-white/5 rounded-[20px] overflow-hidden group flex flex-col relative transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/30 shadow-lg"
              >
                {/* DETALHE NEON CORNERS */}
                <div className="absolute top-0 left-0 w-8 h-[2px] bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute top-0 left-0 w-[2px] h-8 bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* ÁREA DA IMAGEM */}
                <div className="h-48 bg-[#0a0a0a] relative flex items-center justify-center p-4 border-b border-white/5 overflow-hidden cursor-pointer" onClick={() => setViewProduct(p)}>
                  {/* Fundo de luz glow para a imagem com a cor principal salva no painel */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_60%)] opacity-5 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {p.image ? (
                    <Image 
                      src={p.image} 
                      alt={p.name} 
                      fill 
                      unoptimized 
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 relative z-10" 
                    />
                  ) : (
                    <div className="relative z-10 p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      {ICON_MAP[p.icon] || <Package className="w-12 h-12 text-zinc-700" />}
                    </div>
                  )}

                  {/* BADGE DA CATEGORIA FLUTUANTE */}
                  <div className="absolute top-3 left-3 bg-[#030303] px-3 py-1 rounded-md text-[8px] font-black uppercase text-zinc-400 border border-white/10 tracking-[0.2em] z-20 group-hover:border-[var(--primary)]/30 group-hover:text-[var(--primary)] transition-colors">
                    {p.category}
                  </div>
                </div>

                {/* CONTEÚDO E BOTÃO FULL WIDTH */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="mb-6 cursor-pointer" onClick={() => setViewProduct(p)}>
                    <h3 className="font-black text-lg text-white mb-1 uppercase tracking-tight truncate group-hover:text-[var(--primary)] transition-colors">{p.name}</h3>
                    <p className="text-zinc-500 text-[11px] line-clamp-2 leading-relaxed font-medium">{p.description}</p>
                  </div>
                  
                  <div className="mt-auto space-y-4">
                     <p className="text-2xl font-black text-white tracking-tighter italic">
                       R$ {p.price.toFixed(2)}
                     </p>
                     
                     <Button 
                       onClick={() => addToCart(p.id)} 
                       className="w-full bg-[var(--primary)] hover:brightness-110 text-[#030303] font-black uppercase tracking-widest text-[10px] py-6 rounded-xl transition-all active:scale-95 border-none"
                       style={{ boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 15%, transparent)" }}
                     >
                        COMPRAR
                     </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filtered.length === 0 && (
              <div className="col-span-full py-24 text-center bg-[#0a0a0a] rounded-[24px] border border-dashed border-white/10">
                <Search className="w-10 h-10 text-zinc-800 mx-auto mb-4" />
                <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">Nenhum produto encontrado para estes filtros.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CARRINHO FLUTUANTE */}
      <AnimatePresence>
        {totalItens > 0 && (
          <motion.button 
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-8 right-6 md:right-8 bg-[var(--primary)] text-black p-4 rounded-full font-black flex items-center justify-center z-[90] transition-transform active:scale-95 border border-[#030303]/20 hover:scale-105"
            style={{ boxShadow: "0 10px 40px color-mix(in srgb, var(--primary) 40%, transparent)" }}
          >
            <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-3 -right-3 bg-red-600 text-white text-[10px] min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full font-black border-2 border-[var(--primary)]">{totalItens}</span>
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
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic">Seu Carrinho</h2>
                  <p className="text-[10px] text-[var(--primary)] uppercase tracking-widest font-bold mt-1">Confira seus itens</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 border border-white/5"><X className="w-5 h-5"/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                {cartDetails.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                    <div className="w-16 h-16 bg-[#050505] rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-white/5 relative">
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
                      <div className="flex items-center gap-2 bg-[#050505] px-2 py-1.5 rounded-lg border border-white/10">
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

              <div className="p-6 md:p-8 bg-[#0a0a0a] border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end pb-4 border-b border-white/5">
                    <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] italic">Total do Pedido</span>
                    <span className="text-4xl font-black text-white tracking-tighter italic">R$ {totalGeral.toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleGeneratePix} 
                  disabled={checkoutLoading || cart.length === 0}
                  className="w-full bg-[var(--primary)] hover:brightness-110 text-black font-black py-7 rounded-xl text-sm border-none transition-all flex justify-center uppercase tracking-widest italic"
                  style={{ boxShadow: "0 10px 30px color-mix(in srgb, var(--primary) 20%, transparent)" }}
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
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-[32px] max-w-sm w-full text-center shadow-2xl">
                    <button onClick={() => setCheckoutStep("none")} className="absolute top-6 right-6 text-zinc-500 hover:text-white bg-white/5 p-2 rounded-xl"><X className="w-5 h-5"/></button>
                    
                    <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-[var(--primary)]/20 shadow-inner">
                        <Smartphone className="w-10 h-10 text-[var(--primary)] animate-pulse" />
                    </div>
                    
                    <h3 className="text-3xl font-black mb-1 uppercase tracking-tighter text-white italic">Checkout</h3>
                    <p className="text-zinc-500 font-bold mb-8 text-[10px] uppercase tracking-[0.2em]">Escaneie para pagar</p>
                    
                    <div className="bg-[#050505] p-4 rounded-2xl mb-8 flex justify-center border border-white/10 shadow-inner mx-auto w-fit">
                        <Image 
                          src={`data:image/jpeg;base64,${pixData.qrCodeBase64}`} 
                          alt="QR Code PIX"
                          width={192}
                          height={192}
                          unoptimized
                          className="object-contain rounded-xl mix-blend-screen"
                        />
                    </div>
                    
                    <Button onClick={handleCopyPix} className="w-full bg-[#111] hover:bg-[#222] text-white border border-white/10 py-7 rounded-xl font-black text-xs mb-4 uppercase tracking-widest italic group">
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

      {/* MODAL DETALHES DE PRODUTO (QUANDO CLICA NA IMAGEM OU TITULO) */}
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
                        <Button onClick={() => { addToCart(viewProduct.id); setViewProduct(null); }} className="w-full sm:w-auto bg-[var(--primary)] hover:brightness-110 text-black font-black py-7 px-8 rounded-2xl border-none transition-all active:scale-95 tracking-widest uppercase italic" style={{ boxShadow: "0 10px 30px color-mix(in srgb, var(--primary) 20%, transparent)" }}>
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