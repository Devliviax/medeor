import iconStatQuestoes from "../../assets/figma/icon_stat-questoes.svg";
import iconStatGeneric from "../../assets/figma/icon_stat-generic.svg";

const cards = [
  {
    dark: true,
    icon: iconStatQuestoes,
    label: "Questões hoje",
    value: "0/7",
    caption: "meta diária",
  },
  {
    icon: iconStatGeneric,
    label: "Semana",
    value: "0%",
    caption: "0 de 50 questões",
  },
  {
    icon: iconStatGeneric,
    label: "Aproveitamento",
    value: "0%",
    caption: "sem acertos ainda",
  },
  {
    icon: iconStatGeneric,
    label: "Consistência",
    value: "1 dia",
    caption: "recorde de 1 dia",
  },
];

export default function StatCards() {
  return (
    <div className="flex h-[148px] w-full flex-wrap gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`flex w-[269px] flex-1 flex-col items-start self-stretch rounded-3xl p-6 ${
            card.dark ? "bg-[#183351]" : "bg-bg-white-0"
          }`}
        >
          <div className="flex w-full items-start justify-between">
            <p
              className={`text-[14px] tracking-[-0.1504px] ${
                card.dark ? "text-[rgba(249,250,251,0.7)]" : "text-[#6d7279]"
              }`}
            >
              {card.label}
            </p>
            <img alt="" src={card.icon} className="size-4" />
          </div>
          <p
            className={`h-[60px] pt-6 text-[30px] font-bold tracking-[-0.3545px] ${
              card.dark ? "text-[#f9fafb]" : "text-[#15181e]"
            }`}
          >
            {card.value}
          </p>
          <p
            className={`h-5 pt-1 text-[12px] ${
              card.dark ? "text-[rgba(249,250,251,0.6)]" : "text-[#6d7279]"
            }`}
          >
            {card.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
