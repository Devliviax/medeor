import { useTheme } from "../../contexts/ThemeContext";
import iconBancoQuestoes from "../../assets/figma/quick_banco-questoes.svg";
import iconSimulados from "../../assets/figma/quick_simulados.svg";
import iconMateriais from "../../assets/figma/quick_materiais.svg";
import iconCadernoErros from "../../assets/figma/quick_caderno-erros.svg";
import iconFlashcards from "../../assets/figma/quick_flashcards.svg";
import iconLeitura from "../../assets/figma/quick_leitura.svg";
import iconCronograma from "../../assets/figma/quick_cronograma.svg";
import iconEstatisticas from "../../assets/figma/quick_estatisticas.svg";
import iconDiretrizes from "../../assets/figma/quick_diretrizes.svg";

import darkIconBancoQuestoes from "../../assets/figma/dark/quick_banco-questoes.svg";
import darkIconSimulados from "../../assets/figma/dark/quick_simulados.svg";
import darkIconMateriais from "../../assets/figma/dark/quick_materiais.svg";
import darkIconCadernoErros from "../../assets/figma/dark/quick_caderno-erros.svg";
import darkIconFlashcards from "../../assets/figma/dark/quick_flashcards.svg";
import darkIconLeitura from "../../assets/figma/dark/quick_leitura.svg";
import darkIconCronograma from "../../assets/figma/dark/quick_cronograma.svg";
import darkIconEstatisticas from "../../assets/figma/dark/quick_estatisticas.svg";
import darkIconDiretrizes from "../../assets/figma/dark/quick_diretrizes.svg";

const groups = [
  {
    title: "Estudar",
    items: [
      { icon: iconBancoQuestoes, darkIcon: darkIconBancoQuestoes, title: "Banco de questões", caption: "Filtre por tema e instituição" },
      { icon: iconSimulados, darkIcon: darkIconSimulados, title: "Simulados", caption: "Provas cronometradas" },
      { icon: iconMateriais, darkIcon: darkIconMateriais, title: "Materiais", caption: "Resumos e diretrizes" },
    ],
  },
  {
    title: "Revisar",
    items: [
      { icon: iconCadernoErros, darkIcon: darkIconCadernoErros, title: "Caderno de erros", caption: "Refaça o que você errou" },
      { icon: iconFlashcards, darkIcon: darkIconFlashcards, title: "Flashcards", caption: "Repetição espaçada" },
      { icon: iconLeitura, darkIcon: darkIconLeitura, title: "Leitura na aula", caption: "Blocos guiados de leitura" },
    ],
  },
  {
    title: "Acompanhar",
    items: [
      { icon: iconCronograma, darkIcon: darkIconCronograma, title: "Cronograma", caption: "Plano das próximas semanas" },
      { icon: iconEstatisticas, darkIcon: darkIconEstatisticas, title: "Estatísticas", caption: "Aproveitamento por tema" },
      { icon: iconDiretrizes, darkIcon: darkIconDiretrizes, title: "Diretrizes", caption: "Atualizações e protocolos" },
    ],
  },
];

export default function AcoesRapidas() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
                    <img alt="" src={isDark ? item.darkIcon : item.icon} className="size-4" />
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
