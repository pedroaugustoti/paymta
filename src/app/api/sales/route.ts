import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Retorna a listagem de vendas (mock inicial ou puxado do Prisma se houver modelo de Sale)
    const sales = [
      {
        id: "SALE-9821",
        productName: "VIP Ouro - 30 Dias",
        buyer: "Jogador Exemplo",
        amount: 50.00,
        status: "approved",
        createdAt: new Date().toISOString(),
      }
    ];

    return NextResponse.json(sales);
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}