import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 mb-12">
        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white mb-4">
          Documentação <span className="text-purple-500">API</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Aprenda a integrar a PayMTA no seu servidor usando nosso recurso nativo em Lua. A entrega dos pacotes é instantânea após o pagamento PIX.
        </p>
      </div>

      <div className="space-y-12 animate-in fade-in zoom-in duration-700 delay-100">
        
        {/* Passo 1 */}
        <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
          <h2 className="text-2xl font-black italic uppercase text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 text-sm">1</span>
            Instalação do Resource
          </h2>
          <p className="text-zinc-400 mb-6">
            Baixe nosso resource oficial e coloque na pasta `resources` do seu servidor. Adicione a permissão de admin na ACL para que ele possa dar os itens.
          </p>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono">
              <code>
<span className="text-purple-400">&lt;group</span> <span className="text-yellow-300">name</span>=<span className="text-green-400">"Admin"</span><span className="text-purple-400">&gt;</span>{`\n`}
  <span className="text-purple-400">&lt;object</span> <span className="text-yellow-300">name</span>=<span className="text-green-400">"resource.paymta_core"</span><span className="text-purple-400">&gt;&lt;/object&gt;</span>{`\n`}
<span className="text-purple-400">&lt;/group&gt;</span>
              </code>
            </pre>
          </div>
        </section>

        {/* Passo 2 */}
        <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
          <h2 className="text-2xl font-black italic uppercase text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 text-sm">2</span>
            Configurando o Token
          </h2>
          <p className="text-zinc-400 mb-6">
            No arquivo `config.lua` do resource, insira o seu Bearer Token gerado no painel da PayMTA.
          </p>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono">
              <code>
<span className="text-zinc-500">-- config.lua</span>{`\n`}
Config = {`{`}{`\n`}
  API_TOKEN = <span className="text-green-400">"mta_token_aqui_12345"</span>,{`\n`}
  SERVER_ID = <span className="text-orange-400">1</span>{`\n`}
{`}`}
              </code>
            </pre>
          </div>
        </section>

        {/* Passo 3 */}
        <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
          <h2 className="text-2xl font-black italic uppercase text-white mb-4 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 text-sm">3</span>
            Função de Entrega (Callback)
          </h2>
          <p className="text-zinc-400 mb-6">
            O nosso script já escuta a API via Webhooks. Você só precisa definir o que acontece quando o pagamento for aprovado.
          </p>
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-zinc-300 font-mono">
              <code>
<span className="text-purple-400">addEvent</span>(<span className="text-green-400">"onPayMTAPaymentApproved"</span>, <span className="text-orange-400">true</span>){`\n`}
<span className="text-purple-400">addEventHandler</span>(<span className="text-green-400">"onPayMTAPaymentApproved"</span>, root, {`\n`}
  <span className="text-purple-400">function</span>(playerID, packageName){`\n`}
    <span className="text-purple-400">local</span> player = getPlayerFromID(playerID){`\n`}
    <span className="text-purple-400">if</span> player <span className="text-purple-400">then</span>{`\n`}
      <span className="text-zinc-500">-- Entrega o VIP baseado no nome do pacote</span>{`\n`}
      <span className="text-purple-400">givePlayerVIP</span>(player, packageName){`\n`}
      <span className="text-purple-400">outputChatBox</span>(<span className="text-green-400">"Obrigado por comprar na nossa loja!"</span>, player, <span className="text-orange-400">0</span>, <span className="text-orange-400">255</span>, <span className="text-orange-400">0</span>){`\n`}
    <span className="text-purple-400">end</span>{`\n`}
  <span className="text-purple-400">end</span>{`\n`}
)
              </code>
            </pre>
          </div>
        </section>

      </div>
    </div>
  );
}