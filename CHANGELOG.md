# Changelog

## 2026-08-26 — Fix: fundo da página vs fundo do conteúdo (cores trocadas)

O fundo da página inteira (fora do "Main Content Container") e o fundo
do conteúdo principal (dentro dele) estavam usando a mesma cor
(#F7F7F7). São dois tokens diferentes no Figma: página = `bg/weak-50`
(#F5F5F5), conteúdo = `bg/soft-200` (#F7F7F7). Corrigido pra usar cada
um no lugar certo.

## 2026-08-26 — Auditoria contra o Figma: gráfico, truncamento, largura

Comparei screenshot real do Figma (node 144:285459) com o app rodando
pra achar o que ainda estava faltando/errado:

- Gráfico "Corrida da liga" era só 5 pills idênticas sem dado nenhum —
  agora tem alturas reais por semana, 2 barras destacadas (navy) nas
  semanas de pico, eixo Y (0/25/50/75/100) e linhas de grade tracejadas,
  batendo com os valores exatos exportados do Figma.
- Cards de evento na agenda quebravam em várias linhas (herança de um
  fix de sobreposição anterior); no Figma o texto trunca em 1 linha com
  reticência. Corrigido pra `truncate`, que também elimina qualquer risco
  de voltar a sobrepor.
- Corrigir esse truncamento expôs um bug de layout: a linha Agenda +
  Questão Relâmpago perdeu o split 50/50 (Questão virou uma coluna de
  141px, esticada verticalmente). Causa: itens flex sem `min-w-0`
  deixavam o conteúdo determinar a largura mínima de forma desigual.
  Adicionado `min-w-0` nos dois wrappers — confirmado 550px/550px.

## 2026-08-26 — Fix: sidebar encostando na topbar

- Sidebar é um card arredondado (rounded-3xl) mas estava com gap zero em
  relação à topbar — o canto arredondado encontrava a quina reta da
  topbar sem respiro, sobrando um pedaço de fundo cinza estranho no
  encontro. Adicionado gap/padding ao redor pra sidebar flutuar como
  card de verdade, igual ao Figma.

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
