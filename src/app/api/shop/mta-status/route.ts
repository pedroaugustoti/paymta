import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ipParam = searchParams.get("ip");

  if (!ipParam) {
    return NextResponse.json({ error: "IP não fornecido" }, { status: 400 });
  }

  try {
    const [host, portStr] = ipParam.split(":");
    const port = portStr ? parseInt(portStr, 10) : 22003;

    // 🔴 COLOQUE AQUI A URL DA SUA API HOSPEDADA
    // Exemplo: https://sua-api-mta.onrender.com
    const API_URL = `https://URL_DA_API/api/server?ip=${host}&port=${port}`;

    // Faz o fetch via HTTP (Permitido pela Vercel)
    // O 'revalidate: 15' garante que o Next faça cache por 15 segundos para não spammar a API
    const res = await fetch(API_URL, { next: { revalidate: 15 } });
    
    if (!res.ok) throw new Error("Falha na API externa");
    
    const data = await res.json();

    return NextResponse.json({
      isOnline: true, // Ou verifique o campo de status da API (ex: data.online)
      players: data.players || 0,
      maxPlayers: data.maxPlayers || 0,
      ping: data.ping || 0
    });

  } catch (error) {
    // Se a API estiver offline, cai no catch graciosamente
    return NextResponse.json({
      isOnline: false,
      players: 0,
      maxPlayers: 0,
      ping: 0
    }, { status: 200 }); 
  }
}