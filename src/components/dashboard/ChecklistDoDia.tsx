import { useTheme } from "../../contexts/ThemeContext";
import iconCheck from "../../assets/figma/icon_check.svg";
import darkIconCheck from "../../assets/figma/dark/icon_check.svg";

const items = [
  { label: "Questão do dia", progress: "0/1" },
  { label: "Meta de questões", progress: "0/7" },
  { label: "Revisão de flashcards", progress: "0/5" },
  { label: "Revisão de flashcards", progress: "0/5" },
];

export default function ChecklistDoDia() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex h-full w-[512px] shrink-0 flex-col items-start rounded-3xl bg-bg-white-0 p-6 dark:bg-[#222530]">
      <p className="text-[14px] font-medium tracking-[-0.1504px] text-[#15181e] dark:text-[#f8fafc]">Checklist do dia</p>
      <div className="flex w-full flex-col items-start gap-2 pt-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-between rounded-[20px] bg-[#f2f3f6] px-4 py-3 dark:bg-[#020617]"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-5 items-center justify-center rounded-full bg-bg-white-0 dark:bg-[#0f172a]">
                <img alt="" src={isDark ? darkIconCheck : iconCheck} className="size-3" />
              </span>
              <p className="text-[14px] tracking-[-0.1504px] text-[#15181e] dark:text-[#f8fafc]">{item.label}</p>
            </div>
            <p className="text-[12px] text-[#6d7279] dark:text-[#94a3b8]">{item.progress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
