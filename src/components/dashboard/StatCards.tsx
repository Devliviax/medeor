import { HugeiconsIcon } from "@hugeicons/react";
import { AnalyticsUpIcon } from "@hugeicons/core-free-icons";

const cards = [
  {
    dark: true,
    label: "Questões hoje",
    value: "0/7",
    caption: "meta diária",
  },
  {
    label: "Semana",
    value: "0%",
    caption: "0 de 50 questões",
  },
  {
    label: "Aproveitamento",
    value: "0%",
    caption: "sem acertos ainda",
  },
  {
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
            card.dark ? "bg-[#183351] dark:bg-[#181b25]" : "bg-bg-white-0 dark:bg-[#222530]"
          }`}
        >
          <div className="flex w-full items-start justify-between">
            <p
              className={`text-[14px] tracking-[-0.1504px] ${
                card.dark
                  ? "text-[rgba(249,250,251,0.7)] dark:text-[rgba(248,250,252,0.7)]"
                  : "text-[#6d7279] dark:text-[#94a3b8]"
              }`}
            >
              {card.label}
            </p>
            <HugeiconsIcon
              icon={AnalyticsUpIcon}
              size={16}
              className={
                card.dark
                  ? "text-[rgba(249,250,251,0.6)] dark:text-[rgba(248,250,252,0.6)]"
                  : "text-[#6d7279] dark:text-[#94a3b8]"
              }
            />
          </div>
          <p
            className={`h-[60px] pt-6 text-[30px] font-bold tracking-[-0.3545px] ${
              card.dark ? "text-[#f9fafb] dark:text-[#f8fafc]" : "text-[#15181e] dark:text-[#f8fafc]"
            }`}
          >
            {card.value}
          </p>
          <p
            className={`h-5 pt-1 text-[12px] ${
              card.dark
                ? "text-[rgba(249,250,251,0.6)] dark:text-[rgba(248,250,252,0.6)]"
                : "text-[#6d7279] dark:text-[#94a3b8]"
            }`}
          >
            {card.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
