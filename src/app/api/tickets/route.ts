import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

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
      tickets = await prisma.ticket.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else {
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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { subject, department, message } = await req.json();
    const userEmail = session.user.email;

    if (!userEmail) {
      return NextResponse.json({ error: "E-mail do usuário obrigatório" }, { status: 400 });
    }

    // Gera um ID único e curto baseado em hash para evitar duplicidade
    const uniqueId = `TK-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    const newTicket = await prisma.ticket.create({
      data: {
        id: uniqueId,
        subject,
        department,
        message,
        status: "open",
        userEmail: userEmail,
        lastReply: "Aguardando Suporte",
      },
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error("Erro detalhado ao criar ticket:", error);
    return NextResponse.json({ error: "Erro ao criar chamado" }, { status: 500 });
  }
}