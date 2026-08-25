# Medeor QBank

Dashboard "Estudar" do Medeor QBank, implementado a partir do design no Figma.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (tokens em `src/index.css`, bloco `@theme`)
- Fontes Onest e Cal Sans self-hosted via `@fontsource`
- Assets (ícones/imagens) exportados direto do Figma em `src/assets/figma/`

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

Componentes do dashboard em `src/components/dashboard/`:

- `EstudarDashboard.tsx` — composição da página
- `Sidebar.tsx` — navegação, recolhível, card de aviso + perfil
- `Topbar.tsx` — saudação, notificações, busca (Cmd+K)
- `StatCards.tsx`, `PlanoDoDia.tsx`, `ChecklistDoDia.tsx`, `LigaRanking.tsx`, `QuestaoRelampago.tsx`, `AcoesRapidas.tsx`
- `AgendaSemana.tsx` — agenda com visualização Semana/Mês/Lista + modal de novo compromisso
- `NotificationsDropdown.tsx`, `SearchDialog.tsx`, `NovoCompromissoDialog.tsx`

Ver `CHANGELOG.md` para histórico de mudanças.

## Deploy

Conectado ao Vercel via integração com GitHub — todo push na branch principal gera um deploy automático.
