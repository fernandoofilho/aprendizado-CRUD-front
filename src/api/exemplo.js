import { api } from "./cliente.js";

export function ping() {
  return api("/api/exemplo/ping");
}

export function ecoQuery(mensagem) {
  const params = new URLSearchParams({ mensagem });
  return api(`/api/exemplo/eco?${params.toString()}`);
}

export function ecoBody(payload) {
  return api("/api/exemplo/eco", { method: "POST", body: payload });
}
