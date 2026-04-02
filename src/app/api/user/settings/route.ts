import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const settings = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const updateData: any = {};

    // SÓ ATUALIZA SE O CAMPO VIER NO CORPO DA REQUISIÇÃO
    if (body.slug !== undefined) updateData.slug = body.slug?.trim().toLowerCase() || null;
    if (body.serverName !== undefined) updateData.serverName = body.serverName;
    if (body.navbarName !== undefined) updateData.navbarName = body.navbarName;
    if (body.footerName !== undefined) updateData.footerName = body.footerName;
    if (body.slogan !== undefined) updateData.slogan = body.slogan;
    if (body.primaryColor !== undefined) updateData.primaryColor = body.primaryColor;
    
    // --- CORREÇÃO: CAMPO LOGO INSERIDO AQUI ---
    if (body.logoUrl !== undefined) updateData.logoUrl = body.logoUrl;
    // ------------------------------------------

    if (body.heroImageUrl !== undefined) updateData.heroImageUrl = body.heroImageUrl;
    if (body.discordUrl !== undefined) updateData.discordUrl = body.discordUrl;
    if (body.instagramUrl !== undefined) updateData.instagramUrl = body.instagramUrl;
    if (body.youtubeUrl !== undefined) updateData.youtubeUrl = body.youtubeUrl;
    if (body.termsContent !== undefined) updateData.termsContent = body.termsContent;
    if (body.mpAccessToken !== undefined) updateData.mpAccessToken = body.mpAccessToken;
    if (body.licenseKey !== undefined) updateData.licenseKey = body.licenseKey;
    
    // --- NOVOS CAMPOS INJETADOS AQUI ---
    if (body.description !== undefined) updateData.description = body.description;
    if (body.serverIp !== undefined) updateData.serverIp = body.serverIp;
    if (body.isMaintenance !== undefined) updateData.isMaintenance = body.isMaintenance;

    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH_ERROR:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}