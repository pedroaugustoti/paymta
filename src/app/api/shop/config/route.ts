import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug não fornecido" }, { status: 400 });
    }

    // Visão de Analista: SELECT estrito para performance e segurança
    const store = await prisma.user.findUnique({
      where: { 
        slug: slug.toLowerCase().trim() 
      },
      select: {
        // CAMPOS PÚBLICOS E DE IDENTIDADE
        id: true,
        slug: true, // Adicionado para a marca d'água funcionar 100%
        serverName: true,
        navbarName: true,
        footerName: true,
        slogan: true,
        description: true, // Agora o texto de boas-vindas vai aparecer!
        primaryColor: true,
        logoUrl: true,
        heroImageUrl: true,
        
        // INFRAESTRUTURA
        serverIp: true, // ESSENCIAL: Sem isso o status do MTA fica "Offline"
        isMaintenance: true,
        termsContent: true,
        
        // LINKS DE REDES SOCIAIS
        discordUrl: true,
        instagramUrl: true,
        youtubeUrl: true,

        // RELAÇÕES (Produtos, Regras e Ranks)
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
      }
    });

    if (!store) {
      return NextResponse.json({ error: "Loja não encontrada" }, { status: 404 });
    }

    // Visão de ADS: Cache de borda para carregamento ultra rápido
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