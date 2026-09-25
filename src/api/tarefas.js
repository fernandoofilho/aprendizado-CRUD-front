import { api } from "./cliente.js";

export function listarTarefas(filtro) {
  const params = new URLSearchParams();
  if (filtro === "true" || filtro === "false") {
    params.set("concluida", filtro);
  }
  const query = params.toString();
  return api(`/api/tarefas${query ? `?${query}` : ""}`);
}

export function criarTarefa(dados) {
  return api("/api/tarefas", { method: "POST", body: dados });
}

export function atualizarTarefa(id, dados) {
  return api(`/api/tarefas/${id}`, { method: "PUT", body: dados });
}

export function apagarTarefa(id) {
  return api(`/api/tarefas/${id}`, { method: "DELETE" });
}
