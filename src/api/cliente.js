// Toda chamada HTTP do React passa por aqui.
// BASE_URL aponta para o Express. O Vite só lê variáveis que começam com VITE_.

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export function urlDaApi() {
  return BASE_URL;
}

export async function api(caminho, { method = "GET", body } = {}) {
  let resposta;

  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(`Não consegui falar com a API em ${BASE_URL}. O backend está rodando?`);
  }

  let dados ;
  if (resposta.status !== 204){
    try {
      dados = await resposta.json()
    }catch {
      dados = null
    }
  }

  if (!resposta.ok) {
    throw new Error(dados?.erro ?? `A API respondeu ${resposta.status}.`);
  }

  return dados;
}
