# Changelog

## 2026-08-26 — Fix: Dashboard dentro do grupo Estudar (deveria ser item próprio) + width Checklist

- Conferindo o frame exato do dashboard dark (140:274363) direto na
  fonte: "Dashboard" é item PRÓPRIO, acima do grupo "Estudar" — não um
  item dentro dele. "Estudar" tem só 4 itens: Questões, Flashcards,
  Provas (renomeado de "Simulados e Provas"), Cronograma. Corrigido
  pros dois temas (claro/escuro), já que a estrutura de navegação não
  muda por tema.
- Checklist do dia: largura fixada em 512px (antes esticava/dividia
  com o Plano de hoje via flex).

## 2026-08-26 — Fix: sidebar sem estrutura completa (Revisar/Desempenho vazios)

O commit anterior só resolveu cor (dark mode) — a navegação em si
estava incompleta: "Revisar" e "Desempenho" eram cabeçalhos estáticos
sem itens. Conferindo a referência completa do Figma, cada grupo tem
uma lista real:

- Revisar: Caderno de Erros, Questões Salvas, Biblioteca.
- Desempenho: Ranking, Estatísticas.

Também:
- Os 3 grupos (Estudar/Revisar/Desempenho) agora abrem/fecham de
  verdade ao clicar no cabeçalho (antes só decorativo), seta gira.
- Hover em todos os itens de navegação, no botão "Praticar questões"
  e no cartão de perfil (antes só o item ativo tinha destaque).
- Ícones dos 5 itens novos baixados em claro e escuro.

## 2026-08-26 — Novo: modo escuro (sidebar)

- Sistema de tema: `ThemeContext` (light/dark) + Tailwind v4 com
  `@custom-variant dark` (classe `.dark` na raiz, não media query).
- Botão "Modo escuro" no Topbar (antes sem função) agora liga/desliga.
- Sidebar totalmente re-skinada pro dark exatamente como o Figma
  mostrou (6 variantes: aberta/fechada × claro/escuro): fundo
  `#0e121b`, bordas `#334155`, texto suave `#94a3b8`, item ativo
  `#020617`, cartão de perfil `#222530`. Ícones da navegação trocam
  pra versão dark (arquivos SVG próprios, não filtro CSS).
- **Escopo**: só a sidebar tem design dark no Figma até agora — resto
  do dashboard (topbar/cards) continua claro quando o modo escuro liga.
  Avisar se quiser que eu estenda pro resto sem referência de design.

## 2026-08-26 — Fix: texto vazando por cima do dropdown de notificações

Bug real (confirmado pelo usuário, não só artefato de screenshot): o
"48 min" do card "Plano de hoje" aparecia por cima do dropdown de
notificações quando aberto, mesmo com o dropdown tendo z-index maior
e fundo branco sólido — um bug de composição de camadas do Chromium
com `overflow-hidden`/`shadow`/`z-index` aninhados. Testei várias
hipóteses de CSS sem sucesso; a correção real foi tirar o dropdown da
árvore de ancestrais problemática: agora renderiza via
`createPortal` pro `document.body`, com posição calculada a partir do
`getBoundingClientRect()` do sino (mesma técnica usada no menu de
conta). Confirmado: sumiu.

## 2026-08-26 — Novo: menu de conta ao clicar no perfil

- Adicionado `AccountMenu.tsx`: clicar no card "Arthur Taylor" (ou só o
  avatar, sidebar recolhida) no rodapé da sidebar abre um menu com
  Perfil / Assinatura / Suporte / Sair. Fecha em clique fora ou Escape.
- Renderizado via portal (`createPortal` pro `document.body`) — a
  sidebar tem `overflow-hidden` pros cantos arredondados, então um
  popup posicionado normalmente (absolute) cortava, principalmente
  recolhida (80px de largura, popup de 256px). Portal escapa desse
  corte; posição calculada a partir do `getBoundingClientRect()` do
  gatilho.

## 2026-08-26 — Fix: radius faltando no Main Content (topbar+conteúdo)

O "Main Content" (topbar + área principal, ambos dentro do Main Content
Container) não tinha cantos arredondados nem sombra própria — ficava
quadrado enquanto a sidebar já era um card arredondado. Confirmado no
Figma: `rounded-[24px] overflow-clip drop-shadow`. Aplicado o mesmo
tratamento — agora os dois lados (sidebar e conteúdo) flutuam como
cards simétricos.

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
