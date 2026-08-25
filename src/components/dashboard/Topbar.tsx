import { useEffect, useState } from "react";
import iconBell from "../../assets/figma/icon_bell.svg";
import iconMoon from "../../assets/figma/icon_moon.svg";
import iconSearch from "../../assets/figma/icon_search-01.svg";
import NotificationsDropdown from "./NotificationsDropdown";
import SearchDialog from "./SearchDialog";

type ActivePanel = "notifications" | "search" | null;

export default function Topbar() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

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
    <header className="flex w-full items-center justify-between border-b border-stroke-soft-200 bg-bg-white-0 px-4 py-[15px]">
      <div className="flex flex-col items-start gap-1">
        <p className="font-display text-[20px] text-[#030712]">
          Olá, <span>Arthur Taylor</span>. 👋🏻
        </p>
        <p className="text-[16px] text-[#6d7279]">
          Priorize a próxima ação e mantenha a consistência.
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border-r border-stroke-soft-200 bg-bg-white-0 px-3 py-2 drop-shadow-[0px_0px_15px_rgba(0,0,0,0.07)]">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <button
              aria-label="Notificações"
              className="size-6"
              onClick={() => setActivePanel((prev) => (prev === "notifications" ? null : "notifications"))}
            >
              <img alt="" src={iconBell} className="size-full" />
            </button>
            {activePanel === "notifications" && (
              <NotificationsDropdown onClose={() => setActivePanel(null)} />
            )}
          </div>
          <button aria-label="Modo escuro" className="size-6">
            <img alt="" src={iconMoon} className="size-full" />
          </button>
          <button
            aria-label="Buscar"
            className="size-6"
            onClick={() => setActivePanel((prev) => (prev === "search" ? null : "search"))}
          >
            <img alt="" src={iconSearch} className="size-full" />
          </button>
        </div>
      </div>
      {activePanel === "search" && <SearchDialog onClose={() => setActivePanel(null)} />}
    </header>
  );
}
