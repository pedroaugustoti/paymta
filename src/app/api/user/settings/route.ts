import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { prisma } from "@/lib/prisma";

// ============================================================
// 📥 GET: BUSCA AS CONFIGURAÇÕES ATUAIS PARA O DASHBOARD
// ============================================================
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        slug: true,
        serverName: true,
        navbarName: true,
        footerName: true,
        slogan: true,
        description: true,
        serverIp: true,
        primaryColor: true,
        logoUrl: true,
        heroImageUrl: true,
        discordUrl: true,
        instagramUrl: true,
        youtubeUrl: true,
        isMaintenance: true,
        termsContent: true, // <-- ADICIONADO PARA OS TERMOS CARREGAREM
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("ERRO_GET_SETTINGS:", error);
    return NextResponse.json({ error: "Erro ao carregar dados" }, { status: 500 });
  }
}

// ============================================================
// ✍️ PATCH: SALVA AS ALTERAÇÕES VINDAS DO DASHBOARD
// ============================================================
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Verificação de Segurança de Analista
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Sessão expirada ou inválida" }, { status: 401 });
    }

    const body = await req.json();
    const updateData: any = {};

    // Mapeamento de campos para garantir que o Prisma receba tudo corretamente
    if (body.serverName !== undefined) updateData.serverName = body.serverName;
    if (body.navbarName !== undefined) updateData.navbarName = body.navbarName;
    if (body.footerName !== undefined) updateData.footerName = body.footerName;
    if (body.slogan !== undefined) updateData.slogan = body.slogan;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.serverIp !== undefined) updateData.serverIp = body.serverIp;
    if (body.primaryColor !== undefined) updateData.primaryColor = body.primaryColor;
    if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl;
    if (body.heroImageUrl !== undefined) updateData.heroImageUrl = body.heroImageUrl;
    if (body.discordUrl !== undefined) updateData.discordUrl = body.discordUrl;
    if (body.instagramUrl !== undefined) updateData.instagramUrl = body.instagramUrl;
    if (body.youtubeUrl !== undefined) updateData.youtubeUrl = body.youtubeUrl;
    if (body.isMaintenance !== undefined) updateData.isMaintenance = body.isMaintenance;
    if (body.termsContent !== undefined) updateData.termsContent = body.termsContent; // <-- ADICIONADO PARA OS TERMOS SALVAREM

    // Lógica de proteção do SLUG
    if (body.slug) {
      const newSlug = body.slug.trim().toLowerCase();
      if (newSlug.length > 0) {
        updateData.slug = newSlug;
      }
    }

    // Executa a atualização no banco de dados
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({
      message: "Configurações atualizadas com sucesso!",
      user: updatedUser
    });

  } catch (error: any) {
    console.error("ERRO_PATCH_SETTINGS:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Este endereço já está sendo usado por outra loja." }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno ao salvar no banco de dados." }, { status: 500 });
  }
}