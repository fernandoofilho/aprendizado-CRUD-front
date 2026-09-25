# Aprendizado CRUD — frontend

Tela em React que chama a API do repositório `aprendizado-CRUD-backend`.

O backend precisa estar no ar em `http://localhost:3001` antes desta tela.

# IMPORTANTE: 
aqui temos um .env exposto, isso está longe do ideal, porém, como o propósito é educativo, seguiremos assim 

## Como subir

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Mapa dos arquivos

| Arquivo | O que olhar |
| --- | --- |
| `src/api/cliente.js` | O `fetch`: método, cabeçalho JSON e tratamento de erro |
| `src/api/exemplo.js` | Chamadas das rotas de treino, sem banco |
| `src/api/tarefas.js` | GET, POST, PUT e DELETE do cadastro |
| `src/componentes/Laboratorio.jsx` | Botões que disparam essas chamadas e mostram o JSON |
| `src/componentes/Tarefas.jsx` | Formulário, lista e `useEffect` para carregar os dados |
| `src/App.jsx` | Junta as duas partes na página |

A URL da API vem de `VITE_API_URL` no arquivo `.env`.

## O que experimentar

1. Com o backend desligado, clique em ping e leia a mensagem de erro.
2. Ligue a API, chame o ping e o eco, e compare o JSON com `src/routes/exemplo.ts`.
3. Crie uma tarefa, marque como concluída e filtre por "Abertas".
4. Edite o título e confira no terminal do backend a linha `PUT /api/tarefas/1`.
