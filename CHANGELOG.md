# Changelog

## 2026-08-26 — Fix: layout quebrando em telas estreitas

- Topbar: ícones (sino/lua/busca) sobrepunham o texto de saudação quando a
  janela ficava estreita e o texto quebrava linha — trocado `items-center`
  por `items-start` + `flex-wrap`, corrigindo a sobreposição.
- Dashboard: conteúdo principal esmagava os cards até ficar ilegível em
  telas estreitas. Adicionado `min-w-[820px]` no conteúdo e scroll
  horizontal no container — abaixo da largura mínima agora rola limpo em
  vez de sobrepor/cortar texto, preservando o layout do Figma.

## 2026-08-25 — Setup inicial

- Projeto criado (Vite + React + TypeScript + Tailwind v4).
- Dashboard "Estudar" implementado a partir do Figma: sidebar, topbar, cards de estatística, plano do dia, checklist, corrida da liga, agenda da semana, questão relâmpago, ações rápidas.
- Sidebar: recolher/expandir funcional, altura acompanha o conteúdo do dashboard, card de aviso com foto sem cortar.
- Agenda: alternância Semana / Mês / Lista, estado vazio, modal de novo compromisso.
- Topbar: dropdown de notificações (com "ver todas"), busca global (Cmd+K).
- Modais com largura/altura responsivas ao viewport.
