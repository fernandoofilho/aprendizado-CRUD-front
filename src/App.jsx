import { Laboratorio } from "./componentes/Laboratorio.jsx";
import { Tarefas } from "./componentes/Tarefas.jsx";
import { urlDaApi } from "./api/cliente.js";

export default function App() {
  return (
    <div className="pagina">
      <header>
        <p className="olho">React chama a API. A API fala com o Postgres.</p>
        <h1>Laboratório de CRUD</h1>
        <p>
          A API deste treino está em <code>{urlDaApi()}</code>. Suba o backend antes de clicar nos
          botões.
        </p>
      </header>
      <main>
        <Laboratorio />
        <Tarefas />
      </main>
    </div>
  );
}
