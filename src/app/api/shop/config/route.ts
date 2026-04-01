import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug não fornecido" }, { status: 400 });
    }

    // Buscamos o usuário pelo slug e trazemos os produtos vinculados
    const config = await prisma.user.findUnique({
      where: { 
        slug: slug.toLowerCase().trim() // Blindagem contra espaços ou letras maiúsculas
      },
      include: { 
        products: {
          where: { active: true } // Opcional: só traz produtos ativos
        },
        // Se você criou abas de regras ou ranks, pode dar include aqui também
        rules: true,
        ranks: true 
      }
    });

    if (!config) {
      return NextResponse.json({ error: "Loja não encontrada" }, { status: 404 });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error("ERRO_FETCH_SHOP_CONFIG:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}