import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug não fornecido" }, { status: 400 });
    }

    // Visão de Analista: Usamos SELECT para garantir que NUNCA enviaremos dados sensíveis
    const store = await prisma.user.findUnique({
      where: { 
        slug: slug.toLowerCase().trim() 
      },
      select: {
        // CAMPOS PÚBLICOS (Seguros)
        id: true,
        serverName: true,
        slogan: true,
        primaryColor: true,
        logoUrl: true,
        heroImageUrl: true,
        isMaintenance: true, // IMPORTANTE: Para o martelo aparecer!
        termsContent: true,
        
        // --- ADICIONADOS PARA O SHOPLAYOUT FUNCIONAR ---
        navbarName: true,
        footerName: true,
        discordUrl: true,
        instagramUrl: true,
        youtubeUrl: true,
        // -----------------------------------------------

        // RELAÇÕES (Incluindo apenas o necessário de cada uma)
        products: {
          where: { active: true },
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            category: true,
            image: true,
            icon: true,
          }
        },
        rules: true,
        ranks: true,
        
        // ⚠️ NUNCA COLOQUE password, email OU mpAccessToken AQUI!
      }
    });

    if (!store) {
      return NextResponse.json({ error: "Loja não encontrada" }, { status: 404 });
    }

    // Visão de ADS: Cache de borda para carregar mais rápido na Vercel
    return NextResponse.json(store, {
        headers: {
            "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59"
        }
    });
    
  } catch (error) {
    console.error("ERRO_FETCH_SHOP_CONFIG:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}