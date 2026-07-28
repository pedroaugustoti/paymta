import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Retorna os tickets do usuário logado (ou todos se for admin)
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // @ts-ignore
    const isAdmin = session.user.role === "ADMIN";
    const userEmail = session.user.email ?? "";

    let tickets;
    if (isAdmin) {
      // Admin vê todos os tickets da plataforma
      tickets = await prisma.ticket.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else {
      // Usuário comum vê apenas os seus próprios tickets
      tickets = await prisma.ticket.findMany({
        where: { userEmail: userEmail },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Erro ao buscar tickets:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

// POST: Cria um novo ticket
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { subject, department, message } = await req.json();
    const userEmail = session.user.email;

    // Se o usuário não tiver email na sessão, bloqueia a criação
    if (!userEmail) {
      return NextResponse.json({ error: "E-mail do usuário obrigatório na sessão" }, { status: 400 });
    }

    const newTicket = await prisma.ticket.create({
      data: {
        id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
        subject,
        department,
        message,
        status: "open",
        userEmail: userEmail, // Garantido que é string
        lastReply: "Aguardando Suporte",
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar ticket:", error);
    return NextResponse.json({ error: "Erro ao criar chamado" }, { status: 500 });
  }
}