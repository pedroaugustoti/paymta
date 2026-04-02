import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, items, total } = body;

    // Validação básica
    if (!slug || !items || items.length === 0 || !total) {
      return NextResponse.json({ error: "Dados inválidos ou carrinho vazio" }, { status: 400 });
    }

    // 1. Buscar o Token do Mercado Pago do dono da loja usando o slug
    const storeOwner = await prisma.user.findFirst({
      where: { slug: slug },
      select: { mpAccessToken: true, serverName: true }
    });

    if (!storeOwner || !storeOwner.mpAccessToken) {
      return NextResponse.json({ error: "O dono da loja não configurou o Mercado Pago." }, { status: 400 });
    }

    // 2. Inicializar a SDK do Mercado Pago com o token do cliente (SaaS)
    const client = new MercadoPagoConfig({ 
      accessToken: storeOwner.mpAccessToken,
      options: { timeout: 5000 } 
    });
    
    const payment = new Payment(client);

    // 3. Criar a cobrança PIX
    const paymentData = {
      transaction_amount: Number(total),
      description: `Compra de Itens VIP - ${storeOwner.serverName || slug}`,
      payment_method_id: "pix",
      payer: {
        // O Mercado Pago exige um email para gerar o PIX. 
        // Como ainda não temos o login do jogador, usamos um email genérico da sua plataforma.
        email: "checkout@paymta.com", 
      },
    };

    const result = await payment.create({ body: paymentData });

    // 4. Retornar os dados do QR Code gerado para o front-end
    if (result.point_of_interaction?.transaction_data) {
      return NextResponse.json({
        qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64,
        qr_code: result.point_of_interaction.transaction_data.qr_code, // Código Copia e Cola
        payment_id: result.id // Usaremos esse ID no futuro para checar se foi pago
      });
    } else {
      throw new Error("Resposta inesperada do Mercado Pago");
    }

  } catch (error: any) {
    console.error("ERRO_CHECKOUT_PIX:", error);
    return NextResponse.json({ error: "Falha interna ao gerar o PIX" }, { status: 500 });
  }
}