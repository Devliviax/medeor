import iconBancoQuestoes from "../../assets/figma/quick_banco-questoes.svg";
import iconSimulados from "../../assets/figma/quick_simulados.svg";
import iconMateriais from "../../assets/figma/quick_materiais.svg";
import iconCadernoErros from "../../assets/figma/quick_caderno-erros.svg";
import iconFlashcards from "../../assets/figma/quick_flashcards.svg";
import iconLeitura from "../../assets/figma/quick_leitura.svg";
import iconCronograma from "../../assets/figma/quick_cronograma.svg";
import iconEstatisticas from "../../assets/figma/quick_estatisticas.svg";
import iconDiretrizes from "../../assets/figma/quick_diretrizes.svg";

const groups = [
  {
    title: "Estudar",
    items: [
      { icon: iconBancoQuestoes, title: "Banco de questões", caption: "Filtre por tema e instituição" },
      { icon: iconSimulados, title: "Simulados", caption: "Provas cronometradas" },
      { icon: iconMateriais, title: "Materiais", caption: "Resumos e diretrizes" },
    ],
  },
  {
    title: "Revisar",
    items: [
      { icon: iconCadernoErros, title: "Caderno de erros", caption: "Refaça o que você errou" },
      { icon: iconFlashcards, title: "Flashcards", caption: "Repetição espaçada" },
      { icon: iconLeitura, title: "Leitura na aula", caption: "Blocos guiados de leitura" },
    ],
  },
  {
    title: "Acompanhar",
    items: [
      { icon: iconCronograma, title: "Cronograma", caption: "Plano das próximas semanas" },
      { icon: iconEstatisticas, title: "Estatísticas", caption: "Aproveitamento por tema" },
      { icon: iconDiretrizes, title: "Diretrizes", caption: "Atualizações e protocolos" },
    ],
  },
];

export default function AcoesRapidas() {
  return (
    <div className="flex w-full flex-col items-start rounded-[22.4px] bg-bg-white-0 p-5">
      <h2 className="text-[16px] font-semibold tracking-[-0.3125px] text-[#0f1f37]">Ações rápidas</h2>
      <p className="text-[12px] text-[#6a727d]">Atalhos para o que você faz todo dia.</p>

      <div className="grid w-full grid-cols-3 gap-6 pt-5">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col items-start">
            <p className="text-[11px] font-bold capitalize text-[#6a727d]">{group.title}</p>
            <div className="flex w-full flex-col items-start gap-2 pt-3">
              {group.items.map((item) => (
                <button
                  key={item.title}
                  className="flex w-full items-center gap-3 rounded-[18.4px] border border-[rgba(225,229,234,0.4)] bg-bg-white-0 px-3 py-2.5 text-left"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-[#ecf1f5]">
                    <img alt="" src={item.icon} className="size-4" />
                  </span>
                  <span className="flex flex-col items-start">
                    <span className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
                      {item.title}
                    </span>
                    <span className="text-[12px] text-[#6a727d]">{item.caption}</span>
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
