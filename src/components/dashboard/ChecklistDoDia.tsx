import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import iconCheck from "../../assets/figma/icon_check.svg";
import darkIconCheck from "../../assets/figma/dark/icon_check.svg";
import iconCheckFilled from "../../assets/figma/icon_check-filled.svg";

const items = [
  { label: "Questão do dia", progress: "0/1" },
  { label: "Meta de questões", progress: "0/7" },
  { label: "Revisão de flashcards", progress: "0/5" },
  { label: "Revisão de flashcards", progress: "0/5" },
];

export default function ChecklistDoDia() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  const toggle = (i: number) => setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="flex h-full w-[512px] shrink-0 flex-col items-start rounded-3xl bg-bg-white-0 p-6 dark:bg-[#222530]">
      <p className="text-[14px] font-medium tracking-[-0.1504px] text-[#15181e] dark:text-[#f8fafc]">Checklist do dia</p>
      <div className="flex w-full flex-col items-start gap-2 pt-4">
        {items.map((item, i) => {
          const isChecked = checked[i];
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={isChecked}
              className={`flex w-full items-center justify-between rounded-[20px] px-4 py-3 text-left transition-colors ${
                isChecked
                  ? "bg-[rgba(31,193,107,0.16)] dark:bg-[#0b4627]"
                  : "bg-[#f2f3f6] dark:bg-[#020617]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-5 items-center justify-center rounded-full ${
                    isChecked ? "bg-[#1daf61]" : "bg-bg-white-0 dark:bg-[#0f172a]"
                  }`}
                >
                  <img alt="" src={isChecked ? iconCheckFilled : isDark ? darkIconCheck : iconCheck} className="size-3" />
                </span>
                <p
                  className={`text-[14px] tracking-[-0.1504px] ${
                    isChecked ? "text-[#15181e] dark:text-white" : "text-[#15181e] dark:text-[#f8fafc]"
                  }`}
                >
                  {item.label}
                </p>
              </div>
              <p
                className={`text-[12px] ${
                  isChecked ? "text-[#717784]" : "text-[#6d7279] dark:text-[#94a3b8]"
                }`}
              >
                {item.progress}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
