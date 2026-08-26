import { useEffect, useMemo, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  SparklesIcon,
  Clock01Icon,
  Add01Icon,
  Bookmark01Icon,
  DashboardSquare01Icon,
  CircleQuestionMarkIcon,
  Timer01Icon,
  Cards02Icon,
  Calendar01Icon,
  RankingIcon,
  ArrowUp01Icon,
  ArrowDown01Icon,
  CornerDownLeftIcon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

interface SuggestionItem {
  id: string;
  icon: typeof Search01Icon;
  label: string;
}

interface SuggestionGroup {
  title: string;
  items: SuggestionItem[];
}

const groups: SuggestionGroup[] = [
  {
    title: "Ações",
    items: [{ id: "ai-plan", icon: SparklesIcon, label: "Pedir à IA para montar um plano de estudo" }],
  },
  {
    title: "Buscas recentes",
    items: [
      { id: "recent-1", icon: Clock01Icon, label: "Meningite bacteriana" },
      { id: "recent-2", icon: Clock01Icon, label: "Insuficiência cardíaca" },
    ],
  },
  {
    title: "Ações rápidas",
    items: [
      { id: "quick-search", icon: Search01Icon, label: "Buscar questões, simulados e provas" },
      { id: "quick-new", icon: Add01Icon, label: "Iniciar nova sessão" },
      { id: "quick-saved", icon: Bookmark01Icon, label: "Ver questões salvas" },
    ],
  },
  {
    title: "Páginas",
    items: [
      { id: "page-dashboard", icon: DashboardSquare01Icon, label: "Dashboard" },
      { id: "page-questoes", icon: CircleQuestionMarkIcon, label: "Questões" },
      { id: "page-simulados", icon: Timer01Icon, label: "Simulados e Provas" },
      { id: "page-flashcards", icon: Cards02Icon, label: "Flashcards" },
      { id: "page-cronograma", icon: Calendar01Icon, label: "Cronograma" },
      { id: "page-ranking", icon: RankingIcon, label: "Ranking" },
      { id: "page-saved", icon: Bookmark01Icon, label: "Questões Salvas" },
    ],
  },
];

const flatItems = groups.flatMap((group) => group.items);

interface SearchDialogProps {
  onClose: () => void;
}

export default function SearchDialog({ onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % flatItems.length);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const selectedId = useMemo(() => flatItems[selectedIndex]?.id, [selectedIndex]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[12vh]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex w-[min(670px,calc(100vw-32px))] flex-col overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-bg-white-0 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] dark:border-0 dark:bg-[#222530]">
        <button
          type="button"
          aria-label="Fechar busca"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-4 items-center justify-center opacity-70 hover:opacity-100"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-[#0f1926] dark:text-white" />
        </button>

        <div className="flex items-center gap-2 border-b border-[#e2e8f0] px-5 dark:border-[#334155]">
          <div className="flex shrink-0 items-start pr-2">
            <HugeiconsIcon icon={Search01Icon} size={20} className="text-[#62748e]" />
          </div>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Busque qualquer coisa..."
            className="h-16 flex-1 bg-transparent py-3 text-[18px] text-text-strong-950 tracking-[-0.44px] outline-none placeholder:text-[#62748e] dark:text-white dark:placeholder:text-[#cacfd8]"
          />
        </div>

        <div className="flex max-h-[min(440px,55vh)] flex-col items-start overflow-y-auto py-1">
          {groups.map((group) => (
            <div key={group.title} className="flex w-full flex-col items-start px-2 py-1.5">
              <div className="flex w-full flex-col items-start px-3 pb-1.5 pt-2">
                <p className="whitespace-nowrap text-[14px] capitalize leading-[16.5px] text-[#62748e]">
                  {group.title}
                </p>
              </div>
              <div className="flex w-full flex-col items-start">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(flatItems.findIndex((i) => i.id === item.id))}
                    className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left ${
                      selectedId === item.id ? "bg-[#f1f5f9] dark:bg-[#181b25]" : ""
                    }`}
                  >
                    <HugeiconsIcon
                      icon={item.icon}
                      size={16}
                      className={`shrink-0 ${item.id === "ai-plan" ? "text-[#12243e] dark:text-white" : "text-[#62748e]"}`}
                    />
                    <span
                      className={`whitespace-nowrap text-[15px] tracking-[-0.23px] text-[#0f1926] ${
                        selectedId === item.id ? "dark:text-white" : "dark:text-[#cacfd8]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-5 border-t border-[#e2e8f0] bg-[rgba(241,245,249,0.4)] px-5 py-3 dark:border-[#334155] dark:bg-[#222530]">
          <div className="flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#f1f5f9] dark:bg-[#181b25]">
              <HugeiconsIcon icon={ArrowUp01Icon} size={14} className="text-[#62748e]" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex size-6 items-center justify-center rounded-lg bg-[#f1f5f9] dark:bg-[#181b25]">
                <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-[#62748e]" />
              </div>
              <p className="whitespace-nowrap text-[14px] tracking-[-0.15px] text-[#62748e]">navegar</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#f1f5f9] dark:bg-[#181b25]">
              <HugeiconsIcon icon={CornerDownLeftIcon} size={14} className="text-[#62748e]" />
            </div>
            <p className="whitespace-nowrap text-[14px] tracking-[-0.15px] text-[#62748e]">selecionar</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 items-center justify-center rounded-lg bg-[#f1f5f9] px-1.5 dark:bg-[#181b25]">
              <p className="whitespace-nowrap text-[12px] font-medium tracking-[-0.15px] text-[#62748e]">Esc</p>
            </div>
            <p className="whitespace-nowrap text-[14px] tracking-[-0.15px] text-[#62748e]">fechar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
