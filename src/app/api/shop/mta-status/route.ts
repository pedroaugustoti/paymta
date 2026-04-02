import { NextResponse } from "next/server";
import { GameDig } from "gamedig";

export async function GET(req: Request) {
  // Pega o IP que o front-end enviou na URL (ex: ?ip=192.168.1.1:22003)
  const { searchParams } = new URL(req.url);
  const ipParam = searchParams.get("ip");

  if (!ipParam) {
    return NextResponse.json({ error: "IP não fornecido" }, { status: 400 });
  }

  try {
    // Separa o IP da porta. Se o dono não colocar porta, usamos a padrão do MTA (22003)
    const [host, portStr] = ipParam.split(":");
    const port = portStr ? parseInt(portStr, 10) : 22003;

    // Faz a consulta via UDP no servidor do cliente
    const state = await GameDig.query({
      type: 'mtasa',
      host: host,
      port: port,
      maxAttempts: 2, // Tenta 2 vezes antes de desistir
      socketTimeout: 2000 // Espera no máximo 2 segundos para não travar a página
    });

    // Retorna os dados formatados do jeito que o nosso page.tsx espera
    return NextResponse.json({
      isOnline: true,
      players: state.players.length || parseInt(state.raw.numplayers),
      maxPlayers: parseInt(state.maxplayers),
      ping: state.ping
    });

  } catch (error) {
    // Se o servidor estiver offline, reiniciando ou com IP errado, cai aqui.
    // Retornamos status 200 para o front-end não dar erro vermelho, apenas mostrar "Offline".
    return NextResponse.json({
      isOnline: false,
      players: 0,
      maxPlayers: 0,
      ping: 0
    }, { status: 200 }); 
  }
}