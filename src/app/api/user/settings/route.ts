import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste o caminho do seu authOptions se necessário
import { prisma } from "@/lib/db"; // Ajuste o caminho do seu cliente Prisma se necessário

// GET: Busca as configurações do usuário logado
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    let settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    // Se o usuário ainda não tiver configurações criadas, criamos um registro padrão na hora
    if (!settings) {
      settings = await prisma.userSettings.create({
        data: {
          userId,
          serverName: session.user.name || "Meu Servidor MTA",
          slug: `servidor-${userId.slice(-6)}`,
          primaryColor: "#facb11",
        },
      });
    }

    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar configurações:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

// PATCH: Atualiza as configurações do usuário logado
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    const {
      serverName,
      navbarName,
      primaryColor,
      logoUrl,
      heroImageUrl,
      discordUrl,
      instagramUrl,
      youtubeUrl,
      slogan,
      description,
      footerName,
      slug,
      serverIp,
      isMaintenance,
      termsContent,
    } = body;

    // Se o slug foi enviado, verificamos se ele já está em uso por outro usuário
    if (slug) {
      const existingSlug = await prisma.userSettings.findFirst({
        where: {
          slug,
          NOT: { userId },
        },
      });

      if (existingSlug) {
        return NextResponse.json(
          { error: "Este link (slug) já está sendo usado por outro servidor." },
          { status: 400 }
        );
      }
    }

    // Atualiza ou cria as configurações no banco
    const updatedSettings = await prisma.userSettings.upsert({
      where: { userId },
      update: {
        serverName,
        navbarName,
        primaryColor,
        logoUrl,
        heroImageUrl,
        discordUrl,
        instagramUrl,
        youtubeUrl,
        slogan,
        description,
        footerName,
        slug,
        serverIp,
        isMaintenance,
        termsContent,
      },
      create: {
        userId,
        serverName: serverName || "Meu Servidor MTA",
        slug: slug || `servidor-${userId.slice(-6)}`,
        primaryColor: primaryColor || "#facb11",
        serverIp,
        isMaintenance,
        termsContent,
      },
    });

    return NextResponse.json(updatedSettings, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    return NextResponse.json({ error: "Erro interno ao salvar configurações" }, { status: 500 });
  }
}