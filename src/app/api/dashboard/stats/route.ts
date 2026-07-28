import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Busca estatísticas reais do banco de dados (ex: contagem de produtos e tickets)
    const totalProducts = await prisma.product.count().catch(() => 0);
    const totalTickets = await prisma.ticket.count().catch(() => 0);

    return NextResponse.json({
      revenue: 14502.50, // Você pode integrar com sua tabela de vendas depois
      totalProducts,
      totalTickets,
      activeStores: 1,
    });
  } catch (error) {
    console.error("Erro ao buscar stats:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}