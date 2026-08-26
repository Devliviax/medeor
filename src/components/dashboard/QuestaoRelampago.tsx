import { useTheme } from "../../contexts/ThemeContext";
import iconCheck from "../../assets/figma/icon_check.svg";
import darkIconCheck from "../../assets/figma/dark/icon_check.svg";

const question =
  "Em relação às doenças sexualmente transmissíveis e infecções pélvicas, pode-se afirmar que: I. Todas as pacientes com FTA-Abs reagente e que nunca recebam tratamento para sífilis, devem ser tratadas; II. Os principais patógenos envolvidos com a doença inflamatória pélvica são Neisseria gonorrhoeae e Candida albicans; III. Úlceras vulvares e/ou vaginais dolorosas e com secreção fétida são patognomônicas de sífilis primária; IV. A droga de escolha para tratamento da tricomoníase é o metronidazol.";

const options = [
  "I e II estão corretas.",
  "II e III estão corretas.",
  "I e III estão corretas.",
  "I e IV estão corretas.",
];

export default function QuestaoRelampago() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex h-full w-full flex-1 flex-col items-start rounded-3xl bg-bg-white-0 p-6 dark:bg-[#181b25]">
      <p className="text-[14px] font-medium tracking-[-0.1504px] text-[#15181e] dark:text-[#f8fafc]">
        Questão Relâmpago
      </p>
      <div className="flex w-full flex-1 flex-col items-start">
        <p className="pt-4 text-[12px] leading-[19.5px] text-[#364153] dark:text-[#94a3b8]">{question}</p>
        <div className="grid w-full flex-1 grid-cols-2 gap-4 pt-2">
          {options.map((opt, i) => (
            <div
              key={opt}
              className={`flex flex-1 items-center justify-between rounded-[20px] px-4 py-3 ${
                i === 0 ? "bg-[#f2f3f6] dark:bg-[#222530]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex size-5 items-center justify-center rounded-full bg-bg-white-0 dark:bg-[#181b25]">
                  <img alt="" src={isDark ? darkIconCheck : iconCheck} className="size-3" />
                </span>
                <p className="text-[14px] tracking-[-0.1504px] text-[#15181e] dark:text-[#f8fafc]">{opt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
