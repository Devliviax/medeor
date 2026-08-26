import { useEffect, useRef, useState } from "react";
import iconBell from "../../assets/figma/icon_bell.svg";
import iconMoon from "../../assets/figma/icon_moon.svg";
import iconSearch from "../../assets/figma/icon_search-01.svg";
import darkIconBell from "../../assets/figma/dark/icon_bell.svg";
import darkIconMoon from "../../assets/figma/dark/icon_moon.svg";
import darkIconSearch from "../../assets/figma/dark/icon_search-01.svg";
import NotificationsDropdown from "./NotificationsDropdown";
import SearchDialog from "./SearchDialog";
import { useTheme } from "../../contexts/ThemeContext";

type ActivePanel = "notifications" | "search" | null;

export default function Topbar() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [notifAnchor, setNotifAnchor] = useState({ top: 0, right: 0 });
  const bellWrapRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    const rect = bellWrapRef.current?.getBoundingClientRect();
    if (rect) {
      setNotifAnchor({ top: rect.bottom + 12, right: window.innerWidth - rect.right });
    }
    setActivePanel((prev) => (prev === "notifications" ? null : "notifications"));
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setActivePanel((prev) => (prev === "search" ? null : "search"));
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="flex w-full flex-wrap items-start justify-between gap-3 border-b border-stroke-soft-200 bg-bg-white-0 px-4 py-[15px] dark:border-[#334155] dark:bg-[#0e121b]">
      <div className="flex min-w-0 flex-col items-start gap-1">
        <p className="font-display text-[20px] text-[#030712] dark:text-[#f8fafc]">
          Olá, <span>Arthur Taylor</span>. 👋🏻
        </p>
        <p className="text-[16px] text-[#6d7279] dark:text-[#94a3b8]">
          Priorize a próxima ação e mantenha a consistência.
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border-r border-stroke-soft-200 bg-bg-white-0 px-3 py-2 drop-shadow-[0px_0px_15px_rgba(0,0,0,0.07)] dark:border-[#334155] dark:bg-[#0f172a]">
        <div className="flex items-center gap-3.5">
          <div ref={bellWrapRef} className="relative">
            <button aria-label="Notificações" className="size-6" onClick={toggleNotifications}>
              <img alt="" src={isDark ? darkIconBell : iconBell} className="size-full" />
            </button>
            {activePanel === "notifications" && (
              <NotificationsDropdown anchor={notifAnchor} onClose={() => setActivePanel(null)} />
            )}
          </div>
          <button
            aria-label="Modo escuro"
            aria-pressed={theme === "dark"}
            className="size-6"
            onClick={toggleTheme}
          >
            <img alt="" src={isDark ? darkIconMoon : iconMoon} className="size-full" />
          </button>
          <button
            aria-label="Buscar"
            className="size-6"
            onClick={() => setActivePanel((prev) => (prev === "search" ? null : "search"))}
          >
            <img alt="" src={isDark ? darkIconSearch : iconSearch} className="size-full" />
          </button>
        </div>
      </div>
      {activePanel === "search" && <SearchDialog onClose={() => setActivePanel(null)} />}
    </header>
  );
}
