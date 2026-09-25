import { useState } from "react";
import { ecoBody, ecoQuery, ping } from "../api/exemplo.js";

export function Laboratorio() {
  const [mensagem, setMensagem] = useState("olá, API");
  const [texto, setTexto] = useState("isso vai no corpo JSON");
  const [resposta, setResposta] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function executar(acao) {
    setCarregando(true);
    setErro("");
    try {
      setResposta(await acao());
    } catch (falha) {
      setResposta(null);
      setErro(falha.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="cartao">
      <h2>Rotas sem banco</h2>
      <p className="nota">
        Estas chamadas param no Express. Nada é gravado. Olhe o terminal do backend: cada clique
        imprime o método e a URL.
      </p>

      <div className="acoes">
        <button type="button" onClick={() => executar(ping)} disabled={carregando}>
          <span className="verbo get">GET</span>
          /api/exemplo/ping
        </button>
      </div>

      <form
        className="linha"
        onSubmit={(evento) => {
          evento.preventDefault();
          executar(() => ecoQuery(mensagem));
        }}
      >
        <label>
          Query string
          <input value={mensagem} onChange={(evento) => setMensagem(evento.target.value)} />
        </label>
        <button type="submit" disabled={carregando}>
          <span className="verbo get">GET</span>
          /api/exemplo/eco
        </button>
      </form>

      <form
        className="linha"
        onSubmit={(evento) => {
          evento.preventDefault();
          executar(() => ecoBody({ texto }));
        }}
      >
        <label>
          Corpo JSON
          <input value={texto} onChange={(evento) => setTexto(evento.target.value)} />
        </label>
        <button type="submit" disabled={carregando}>
          <span className="verbo post">POST</span>
          /api/exemplo/eco
        </button>
      </form>

      {erro ? <p className="erro">{erro}</p> : null}
      <pre>{resposta ? JSON.stringify(resposta, null, 2) : "A resposta da API aparece aqui."}</pre>
    </section>
  );
}
