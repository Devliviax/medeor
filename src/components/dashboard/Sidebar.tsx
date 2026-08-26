import { useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  GraduationCapIcon,
  DashboardSquare01Icon,
  CircleQuestionMarkIcon,
  Cards02Icon,
  Timer01Icon,
  Calendar01Icon,
  RepeatIcon,
  BookEditIcon,
  Bookmark01Icon,
  LibraryIcon,
  Analytics01Icon,
  RankingIcon,
  Chart01Icon,
  ChevronDownIcon,
} from "@hugeicons/core-free-icons";
import { useTheme } from "../../contexts/ThemeContext";
import logo from "../../assets/figma/sidebar_logo_export.png";
import sidebarLine from "../../assets/figma/sidebar_line1.svg";
import promoStudents from "../../assets/figma/sidebar_promo_students.png";
import avatar from "../../assets/figma/sidebar_avatar.jpg";
import AccountMenu from "./AccountMenu";

import darkSidebarLine from "../../assets/figma/dark/sidebar_line.svg";

interface NavItem {
  icon: IconSvgElement;
  label: string;
  active?: boolean;
}

interface NavGroup {
  key: string;
  icon: IconSvgElement;
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    key: "estudar",
    icon: GraduationCapIcon,
    label: "Estudar",
    items: [
      { icon: CircleQuestionMarkIcon, label: "Questões" },
      { icon: Cards02Icon, label: "Flashcards" },
      { icon: Timer01Icon, label: "Provas" },
      { icon: Calendar01Icon, label: "Cronograma" },
    ],
  },
  {
    key: "revisar",
    icon: RepeatIcon,
    label: "Revisar",
    items: [
      { icon: BookEditIcon, label: "Caderno de Erros" },
      { icon: Bookmark01Icon, label: "Questões Salvas" },
      { icon: LibraryIcon, label: "Biblioteca" },
    ],
  },
  {
    key: "desempenho",
    icon: Analytics01Icon,
    label: "Desempenho",
    items: [
      { icon: RankingIcon, label: "Ranking" },
      { icon: Chart01Icon, label: "Estatísticas" },
    ],
  },
];

export default function Sidebar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [collapsed, setCollapsed] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountAnchor, setAccountAnchor] = useState({ left: 0, bottom: 0 });
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    estudar: true,
    revisar: true,
    desempenho: true,
  });
  const footerRef = useRef<HTMLDivElement>(null);

  const toggleGroup = (key: string) => setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const openAccountMenu = () => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (rect) {
      setAccountAnchor({ left: rect.left, bottom: window.innerHeight - rect.top + 8 });
    }
    setAccountOpen((v) => !v);
  };

  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden rounded-3xl bg-bg-white-0 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.03)] transition-[width] duration-200 dark:bg-[#0e121b] ${
        collapsed ? "w-20" : "w-[264px]"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto">
        <div className="flex w-full flex-col">
        <div className="flex w-full items-center gap-2.5 border-b border-stroke-soft-200 px-3.5 py-5 dark:border-[#334155]">
          <img alt="Medeor" src={logo} className="size-10 shrink-0 rounded-[10.667px]" />
          {!collapsed && (
            <div className="flex min-w-0 flex-col items-start gap-2 whitespace-nowrap">
              <p className="font-sans text-[16px] font-semibold tracking-[-0.096px] text-text-strong-950 dark:text-[#f8fafc]">
                Medeor QBank
              </p>
              <p className="font-sans text-[12px] font-light tracking-[-0.072px] text-text-soft-400 dark:text-[#94a3b8]">
                Preparação para residência.
              </p>
            </div>
          )}
          <button
            type="button"
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            onClick={() => setCollapsed((v) => !v)}
            className={`flex shrink-0 items-center justify-center rounded-2xl p-1.5 hover:bg-bg-soft-200 dark:hover:bg-[#222530] ${
              collapsed ? "" : "ml-auto"
            }`}
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={20}
              className={`text-[#99a0ae] transition-transform dark:text-[#94a3b8] ${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-[15px] overflow-hidden pb-[15px]">
          <img alt="" src={isDark ? darkSidebarLine : sidebarLine} className="h-0 w-full" />

          <div className="flex w-full flex-col items-start px-3.5">
            <div
              title={collapsed ? "Dashboard" : undefined}
              className={`flex h-[42px] w-full items-center gap-2 rounded-lg px-3 py-2 bg-[#f1f5f9] dark:bg-[#020617] ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={20}
                className="shrink-0 text-[#99a0ae] dark:text-[#94a3b8]"
              />
              {!collapsed && (
                <p className="whitespace-nowrap font-sans text-[12px] font-bold tracking-[-0.072px] text-[#62748e] dark:text-[#94a3b8]">
                  Dashboard
                </p>
              )}
            </div>
          </div>

          {navGroups.map((group, gi) => {
            const isOpen = openGroups[group.key];
            return (
              <div key={group.key} className="flex w-full flex-col items-start gap-[15px]">
                {gi > 0 && <img alt="" src={isDark ? darkSidebarLine : sidebarLine} className="h-0 w-full" />}
                <div className="flex w-full flex-col items-start px-3.5">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 hover:bg-bg-soft-200 dark:hover:bg-[#222530]"
                  >
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={group.icon} size={20} className="shrink-0 text-[#99a0ae] dark:text-[#94a3b8]" />
                      {!collapsed && (
                        <p className="whitespace-nowrap font-sans text-[12px] font-bold tracking-[-0.072px] text-[#62748e] dark:text-[#94a3b8]">
                          {group.label}
                        </p>
                      )}
                    </div>
                    {!collapsed && (
                      <HugeiconsIcon
                        icon={ChevronDownIcon}
                        size={20}
                        className={`text-[#99a0ae] transition-transform dark:text-[#94a3b8] ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                </div>

                {isOpen && (
                  <div className="flex w-full flex-col items-start gap-1.5 px-3.5">
                    {group.items.map((item) => (
                      <div
                        key={item.label}
                        title={collapsed ? item.label : undefined}
                        className={`flex h-[42px] w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-bg-soft-200 dark:hover:bg-[#222530] ${
                          collapsed ? "justify-center" : ""
                        } ${item.active ? "bg-[#f1f5f9] dark:bg-[#020617]" : ""}`}
                      >
                        <HugeiconsIcon icon={item.icon} size={20} className="shrink-0 text-[#99a0ae] dark:text-[#94a3b8]" />
                        {!collapsed && (
                          <p className="whitespace-nowrap font-sans text-[14px] font-light text-text-soft-400 dark:text-[#94a3b8]">
                            {item.label}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </div>

        {!collapsed && (
          <div className="relative flex w-full flex-col items-start gap-2.5 px-3 pt-3">
            <div className="relative flex h-[366px] w-full flex-col items-start justify-end overflow-hidden rounded-3xl bg-[#183351] p-5">
              <div className="flex w-full flex-col items-start gap-1">
                <p className="text-[11px] font-medium uppercase text-[rgba(249,250,251,0.6)]">Aviso</p>
                <p className="w-[144px] pt-2 text-[16px] font-black leading-none tracking-[-0.3125px] text-[#f9fafb]">
                  Simulado nacional abre nesta sexta
                </p>
                <p className="pt-1.5 text-[12px] leading-[1.2] text-[rgba(249,250,251,0.7)]">
                  Garanta sua vaga e compare seu desempenho com quem mira a mesma instituição.
                </p>
              </div>
              <div className="flex w-full items-start py-2.5">
                <button className="flex h-10 items-center rounded-xl bg-white px-3 py-2 text-[14px] text-[#183351] transition-opacity hover:opacity-90">
                  Praticar questões
                </button>
              </div>
            </div>
            <div className="pointer-events-none absolute left-0 top-[-104px] size-[258px] overflow-hidden">
              <img
                alt=""
                src={promoStudents}
                className="absolute left-[-0.19%] top-[-0.05%] h-[134.6%] w-full max-w-none"
              />
            </div>
            <div className="pointer-events-none absolute left-1/2 top-[17px] h-[137px] w-[225px] -translate-x-1/2 bg-gradient-to-t from-[#183351] to-transparent" />
          </div>
        )}
      </div>

      <div
        ref={footerRef}
        className="relative flex w-full shrink-0 items-center gap-2.5 border-t border-stroke-soft-200 p-3 dark:border-[#334155]"
      >
        {collapsed ? (
          <button type="button" onClick={openAccountMenu} className="mx-auto shrink-0 rounded-full transition-opacity hover:opacity-80">
            <img alt="Conta" src={avatar} className="size-11 rounded-full object-cover" />
          </button>
        ) : (
          <button
            type="button"
            onClick={openAccountMenu}
            className="flex w-full items-center rounded-[15px] border border-stroke-soft-200 bg-bg-soft-200 py-2.5 pl-3 pr-2.5 text-left transition-colors hover:bg-[#f1f5f9] dark:border-[#334155] dark:bg-[#222530] dark:hover:bg-[#2a2f3d]"
          >
            <div className="flex flex-1 items-center gap-2">
              <img alt="" src={avatar} className="size-11 shrink-0 rounded-full object-cover" />
              <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                <p className="text-[14px] font-medium text-text-strong-950 dark:text-[#f8fafc]">Arthur Taylor</p>
                <p className="w-full truncate text-[12px] text-text-soft-400 dark:text-[#94a3b8]">
                  arthur@testhive.com
                </p>
              </div>
              <HugeiconsIcon
                icon={ChevronDownIcon}
                size={20}
                className={`shrink-0 text-[#99a0ae] transition-transform dark:text-[#94a3b8] ${accountOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
        )}
        {accountOpen && <AccountMenu anchor={accountAnchor} onClose={() => setAccountOpen(false)} />}
      </div>
    </aside>
  );
}
