import { HugeiconsIcon } from "@hugeicons/react";
import {
  Database01Icon,
  Timer01Icon,
  Folder01Icon,
  BookEditIcon,
  Cards02Icon,
  Book01Icon,
  Calendar01Icon,
  Chart01Icon,
  Doc01Icon,
} from "@hugeicons/core-free-icons";

const groups = [
  {
    title: "Estudar",
    items: [
      { icon: Database01Icon, title: "Banco de questões", caption: "Filtre por tema e instituição" },
      { icon: Timer01Icon, title: "Simulados", caption: "Provas cronometradas" },
      { icon: Folder01Icon, title: "Materiais", caption: "Resumos e diretrizes" },
    ],
  },
  {
    title: "Revisar",
    items: [
      { icon: BookEditIcon, title: "Caderno de erros", caption: "Refaça o que você errou" },
      { icon: Cards02Icon, title: "Flashcards", caption: "Repetição espaçada" },
      { icon: Book01Icon, title: "Leitura na aula", caption: "Blocos guiados de leitura" },
    ],
  },
  {
    title: "Acompanhar",
    items: [
      { icon: Calendar01Icon, title: "Cronograma", caption: "Plano das próximas semanas" },
      { icon: Chart01Icon, title: "Estatísticas", caption: "Aproveitamento por tema" },
      { icon: Doc01Icon, title: "Diretrizes", caption: "Atualizações e protocolos" },
    ],
  },
];

export default function AcoesRapidas() {
  return (
    <div className="flex w-full flex-col items-start rounded-[22.4px] bg-bg-white-0 p-5 dark:bg-[#181b25]">
      <h2 className="text-[16px] font-semibold tracking-[-0.3125px] text-[#0f1f37] dark:text-[#f8fafc]">
        Ações rápidas
      </h2>
      <p className="text-[12px] text-[#6a727d] dark:text-[#94a3b8]">Atalhos para o que você faz todo dia.</p>

      <div className="grid w-full grid-cols-3 gap-6 pt-5">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col items-start">
            <p className="text-[11px] font-bold capitalize text-[#6a727d] dark:text-[#94a3b8]">{group.title}</p>
            <div className="flex w-full flex-col items-start gap-2 pt-3">
              {group.items.map((item) => (
                <button
                  key={item.title}
                  className="flex w-full items-center gap-3 rounded-[18.4px] border border-[rgba(225,229,234,0.4)] bg-bg-white-0 px-3 py-2.5 text-left hover:bg-bg-soft-200 dark:border-[#334155] dark:bg-[#181b25] dark:hover:bg-[#222530]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[#ecf1f5] dark:bg-[#222530]">
                    <HugeiconsIcon icon={item.icon} size={16} className="text-[#152946] dark:text-[#94a3b8]" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37] dark:text-[#f8fafc]">
                      {item.title}
                    </span>
                    <span className="text-[12px] text-[#6a727d] dark:text-[#94a3b8]">{item.caption}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
