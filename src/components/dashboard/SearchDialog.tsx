import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import iconSearch from "../../assets/figma/search_icon_search.svg";
import iconAi from "../../assets/figma/search_icon_ai.svg";
import iconRecent1 from "../../assets/figma/search_icon_recent1.svg";
import iconRecent2 from "../../assets/figma/search_icon_recent2.svg";
import iconQuickSearch from "../../assets/figma/search_icon_quick_search.svg";
import iconQuickNew from "../../assets/figma/search_icon_quick_new.svg";
import iconBookmark from "../../assets/figma/search_icon_bookmark.svg";
import iconDashboard from "../../assets/figma/search_icon_dashboard.svg";
import iconQuestoes from "../../assets/figma/search_icon_questoes.svg";
import iconSimulados from "../../assets/figma/search_icon_simulados.svg";
import iconFlashcards from "../../assets/figma/search_icon_flashcards.svg";
import iconCronograma from "../../assets/figma/search_icon_cronograma.svg";
import iconRanking from "../../assets/figma/search_icon_ranking.svg";
import kbdUp from "../../assets/figma/search_kbd_up.svg";
import kbdDown from "../../assets/figma/search_kbd_down.svg";
import kbdEnter from "../../assets/figma/search_kbd_enter.svg";
import kbdEsc from "../../assets/figma/search_kbd_esc.svg";
import iconClose1 from "../../assets/figma/search_icon_close1.svg";
import iconClose2 from "../../assets/figma/search_icon_close2.svg";

import darkIconSearch from "../../assets/figma/dark/search_icon_search.svg";
import darkIconAi from "../../assets/figma/dark/search_icon_ai.svg";
import darkIconRecent1 from "../../assets/figma/dark/search_icon_recent1.svg";
import darkIconRecent2 from "../../assets/figma/dark/search_icon_recent2.svg";
import darkIconQuickSearch from "../../assets/figma/dark/search_icon_quick_search.svg";
import darkIconQuickNew from "../../assets/figma/dark/search_icon_quick_new.svg";
import darkIconBookmark from "../../assets/figma/dark/search_icon_bookmark.svg";
import darkIconDashboard from "../../assets/figma/dark/search_icon_dashboard.svg";
import darkIconQuestoes from "../../assets/figma/dark/search_icon_questoes.svg";
import darkIconSimulados from "../../assets/figma/dark/search_icon_simulados.svg";
import darkIconFlashcards from "../../assets/figma/dark/search_icon_flashcards.svg";
import darkIconCronograma from "../../assets/figma/dark/search_icon_cronograma.svg";
import darkIconRanking from "../../assets/figma/dark/search_icon_ranking.svg";
import darkKbdUp from "../../assets/figma/dark/search_kbd_up.svg";
import darkKbdDown from "../../assets/figma/dark/search_kbd_down.svg";
import darkKbdEnter from "../../assets/figma/dark/search_kbd_enter.svg";
import darkKbdEsc from "../../assets/figma/dark/search_kbd_esc.svg";
import darkIconClose1 from "../../assets/figma/dark/search_icon_close1.svg";
import darkIconClose2 from "../../assets/figma/dark/search_icon_close2.svg";

interface SuggestionItem {
  id: string;
  icon: string;
  darkIcon: string;
  label: string;
}

interface SuggestionGroup {
  title: string;
  items: SuggestionItem[];
}

const groups: SuggestionGroup[] = [
  {
    title: "Ações",
    items: [{ id: "ai-plan", icon: iconAi, darkIcon: darkIconAi, label: "Pedir à IA para montar um plano de estudo" }],
  },
  {
    title: "Buscas recentes",
    items: [
      { id: "recent-1", icon: iconRecent1, darkIcon: darkIconRecent1, label: "Meningite bacteriana" },
      { id: "recent-2", icon: iconRecent2, darkIcon: darkIconRecent2, label: "Insuficiência cardíaca" },
    ],
  },
  {
    title: "Ações rápidas",
    items: [
      { id: "quick-search", icon: iconQuickSearch, darkIcon: darkIconQuickSearch, label: "Buscar questões, simulados e provas" },
      { id: "quick-new", icon: iconQuickNew, darkIcon: darkIconQuickNew, label: "Iniciar nova sessão" },
      { id: "quick-saved", icon: iconBookmark, darkIcon: darkIconBookmark, label: "Ver questões salvas" },
    ],
  },
  {
    title: "Páginas",
    items: [
      { id: "page-dashboard", icon: iconDashboard, darkIcon: darkIconDashboard, label: "Dashboard" },
      { id: "page-questoes", icon: iconQuestoes, darkIcon: darkIconQuestoes, label: "Questões" },
      { id: "page-simulados", icon: iconSimulados, darkIcon: darkIconSimulados, label: "Simulados e Provas" },
      { id: "page-flashcards", icon: iconFlashcards, darkIcon: darkIconFlashcards, label: "Flashcards" },
      { id: "page-cronograma", icon: iconCronograma, darkIcon: darkIconCronograma, label: "Cronograma" },
      { id: "page-ranking", icon: iconRanking, darkIcon: darkIconRanking, label: "Ranking" },
      { id: "page-saved", icon: iconBookmark, darkIcon: darkIconBookmark, label: "Questões Salvas" },
    ],
  },
];

const flatItems = groups.flatMap((group) => group.items);

interface SearchDialogProps {
  onClose: () => void;
}

export default function SearchDialog({ onClose }: SearchDialogProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
          <img alt="" src={isDark ? darkIconClose1 : iconClose1} className="absolute size-full" />
          <img alt="" src={isDark ? darkIconClose2 : iconClose2} className="absolute size-full" />
        </button>

        <div className="flex items-center gap-2 border-b border-[#e2e8f0] px-5 dark:border-[#334155]">
          <div className="flex shrink-0 items-start pr-2">
            <img alt="" src={isDark ? darkIconSearch : iconSearch} className="size-5" />
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
                    <img alt="" src={isDark ? item.darkIcon : item.icon} className="size-4 shrink-0" />
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
              <img alt="" src={isDark ? darkKbdUp : kbdUp} className="size-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex size-6 items-center justify-center rounded-lg bg-[#f1f5f9] dark:bg-[#181b25]">
                <img alt="" src={isDark ? darkKbdDown : kbdDown} className="size-3.5" />
              </div>
              <p className="whitespace-nowrap text-[14px] tracking-[-0.15px] text-[#62748e]">navegar</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#f1f5f9] dark:bg-[#181b25]">
              <img alt="" src={isDark ? darkKbdEnter : kbdEnter} className="size-3.5" />
            </div>
            <p className="whitespace-nowrap text-[14px] tracking-[-0.15px] text-[#62748e]">selecionar</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-lg bg-[#f1f5f9] dark:bg-[#181b25]">
              <img alt="" src={isDark ? darkKbdEsc : kbdEsc} className="size-3.5" />
            </div>
            <p className="whitespace-nowrap text-[14px] tracking-[-0.15px] text-[#62748e]">fechar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
