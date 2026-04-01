import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 1. LISTAR PRODUTOS DO PEDRO
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { products: true } // Traz a lista de produtos vinculada ao User
    });

    return NextResponse.json(user?.products || []);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

// 2. CADASTRAR NOVO PRODUTO
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, description, price, category, icon, image } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        icon: icon || "package",
        image: image || null, // SALVANDO A FOTO
        userId: user.id
      }
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error("POST_PRODUCT_ERROR", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}