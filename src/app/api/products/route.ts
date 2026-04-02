import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Verifique se seu authOptions está aqui
import { NextResponse } from "next/server";

// 1. BUSCAR PRODUTOS (GET)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const products = await prisma.product.findMany({
    where: { userId: session.user.id },
    orderBy: { name: "asc" }
  });

  return NextResponse.json(products);
}

// 2. CRIAR PRODUTO (POST)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const data = await req.json();
  
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
      image: data.image,
      icon: data.icon || "package",
      userId: session.user.id,
    }
  });

  return NextResponse.json(product);
}

// 3. APAGAR PRODUTO (DELETE) - O QUE VOCÊ PRECISAVA!
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  // Pegamos o ID que vem na URL: /api/products?id=clx...
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });

  try {
    // Visão de Analista: Verificamos se o produto pertence ao usuário antes de apagar
    await prisma.product.delete({
      where: { 
        id: id,
        userId: session.user.id // Blindagem extra de segurança
      }
    });

    return NextResponse.json({ message: "Produto removido com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao excluir ou produto não encontrado" }, { status: 500 });
  }
}

// 4. ATUALIZAR PRODUTO (PATCH)
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const data = await req.json();
    
    // Verifica se o ID foi enviado
    if (!data.id) {
      return NextResponse.json({ error: "ID do produto não fornecido" }, { status: 400 });
    }

    // Atualiza o produto no banco
    const updatedProduct = await prisma.product.update({
      where: { 
        id: data.id,
        userId: session.user.id // Blindagem extra: garante que ele é o dono
      },
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price), // Convertendo para número, igual no POST
        category: data.category,
        image: data.image,
        icon: data.icon || "package",
      }
    });

    return NextResponse.json(updatedProduct);
    
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json({ error: "Erro interno ao atualizar ou produto não encontrado" }, { status: 500 });
  }
}