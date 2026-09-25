import { useEffect, useState } from "react";
import { apagarTarefa, atualizarTarefa, criarTarefa, listarTarefas } from "../api/tarefas.js";

const formularioVazio = { titulo: "", descricao: "", concluida: false };

export function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [form, setForm] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  async function carregar(proximoFiltro = filtro) {
    setCarregando(true);
    setErro("");
    try {
      setTarefas(await listarTarefas(proximoFiltro));
    } catch (falha) {
      setErro(falha.message);
    } finally {
      setCarregando(false);
    }
  }

  // useEffect roda depois que a tela aparece. Aqui ele busca a lista uma vez.
  useEffect(() => {
    carregar("");
  }, []);

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvar(evento) {
    evento.preventDefault();
    setErro("");
    const dados = {
      titulo: form.titulo,
      descricao: form.descricao,
      concluida: form.concluida,
    };

    try {
      if (editandoId) {
        await atualizarTarefa(editandoId, dados);
      } else {
        await criarTarefa(dados);
      }
      setForm(formularioVazio);
      setEditandoId(null);
      await carregar();
    } catch (falha) {
      setErro(falha.message);
    }
  }

  async function alternar(tarefa) {
    setErro("");
    try {
      await atualizarTarefa(tarefa.id, {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao ?? "",
        concluida: !tarefa.concluida,
      });
      await carregar();
    } catch (falha) {
      setErro(falha.message);
    }
  }

  async function remover(tarefa) {
    if (!window.confirm(`Apagar "${tarefa.titulo}"?`)) return;
    setErro("");
    try {
      await apagarTarefa(tarefa.id);
      if (editandoId === tarefa.id) {
        setEditandoId(null);
        setForm(formularioVazio);
      }
      await carregar();
    } catch (falha) {
      setErro(falha.message);
    }
  }

  return (
    <section className="cartao">
      <h2>Tarefas no Postgres</h2>
      <p className="nota">
        Criar, listar, atualizar e apagar. Cada botão chama uma rota, e a rota usa o Prisma.
      </p>

      <div className="filtros" role="group" aria-label="Filtrar tarefas">
        {[
          ["", "Todas"],
          ["false", "Abertas"],
          ["true", "Concluídas"],
        ].map(([valor, rotulo]) => (
          <button
            key={rotulo}
            type="button"
            className={filtro === valor ? "ativo" : ""}
            onClick={() => {
              setFiltro(valor);
              carregar(valor);
            }}
          >
            {rotulo}
          </button>
        ))}
      </div>

      <form className="formulario" onSubmit={salvar}>
        <label>
          Título
          <input
            value={form.titulo}
            onChange={(evento) => atualizarCampo("titulo", evento.target.value)}
            required
          />
        </label>
        <label>
          Descrição
          <textarea
            value={form.descricao}
            onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
            rows={3}
          />
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={form.concluida}
            onChange={(evento) => atualizarCampo("concluida", evento.target.checked)}
          />
          Já concluída
        </label>
        <div className="acoes">
          <button type="submit">
            <span className={editandoId ? "verbo put" : "verbo post"}>
              {editandoId ? "PUT" : "POST"}
            </span>
            {editandoId ? "Salvar alterações" : "Criar tarefa"}
          </button>
          {editandoId ? (
            <button
              type="button"
              className="secundario"
              onClick={() => {
                setEditandoId(null);
                setForm(formularioVazio);
              }}
            >
              Cancelar edição
            </button>
          ) : null}
        </div>
      </form>

{erro ? <p className="erro">{erro}</p> : null}
{carregando ? <p>Carregando tarefas...</p> : null}
{!carregando && !erro && tarefas.length === 0 ? (
  <p>Nenhuma tarefa neste filtro. Cria a primeira acima.</p>
) : null}

      <ul className="lista">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={tarefa.concluida ? "feita" : ""}>
            <label className="check">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => alternar(tarefa)}
              />
              <span>
                <strong>{tarefa.titulo}</strong>
                {tarefa.descricao ? <small>{tarefa.descricao}</small> : null}
              </span>
            </label>
            <div className="acoes">
              <button
                type="button"
                className="secundario"
                onClick={() => {
                  setEditandoId(tarefa.id);
                  setForm({
                    titulo: tarefa.titulo,
                    descricao: tarefa.descricao ?? "",
                    concluida: tarefa.concluida,
                  });
                }}
              >
                Editar
              </button>
              <button type="button" className="perigo" onClick={() => remover(tarefa)}>
                <span className="verbo delete">DELETE</span>
                Apagar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
