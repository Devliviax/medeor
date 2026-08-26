import { useRef, useState } from "react";
import logo from "../../assets/figma/sidebar_logo_export.png";
import iconArrowDown01 from "../../assets/figma/icon_arrow-down-01.svg";
import iconArrowDown02 from "../../assets/figma/icon_arrow-down-02.svg";
import iconArrowDown03 from "../../assets/figma/icon_arrow-down-03.svg";
import iconArrowDownDouble from "../../assets/figma/icon_arrow-down-double.svg";
import sidebarLine from "../../assets/figma/sidebar_line1.svg";
import iconEstudar from "../../assets/figma/icon_estudar.svg";
import iconDashboard from "../../assets/figma/icon_dashboard.svg";
import iconQuestoes from "../../assets/figma/icon_questoes.svg";
import iconFlashcards from "../../assets/figma/icon_flashcards.svg";
import iconSimulados from "../../assets/figma/icon_simulados.svg";
import iconCronograma from "../../assets/figma/icon_cronograma.svg";
import iconRevisar from "../../assets/figma/icon_revisar.svg";
import iconDesempenho from "../../assets/figma/icon_desempenho.svg";
import promoStudents from "../../assets/figma/sidebar_promo_students.png";
import avatar from "../../assets/figma/sidebar_avatar.jpg";
import AccountMenu from "./AccountMenu";

const studyItems = [
  { icon: iconDashboard, label: "Dashboard", active: true },
  { icon: iconQuestoes, label: "Questões" },
  { icon: iconFlashcards, label: "Flashcards" },
  { icon: iconSimulados, label: "Simulados e Provas" },
  { icon: iconCronograma, label: "Cronograma" },
];

const groupHeaders = [
  { icon: iconRevisar, label: "Revisar", arrow: iconArrowDown03 },
  { icon: iconDesempenho, label: "Desempenho", arrow: iconArrowDown03 },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountAnchor, setAccountAnchor] = useState({ left: 0, bottom: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  const openAccountMenu = () => {
    const rect = footerRef.current?.getBoundingClientRect();
    if (rect) {
      setAccountAnchor({ left: rect.left, bottom: window.innerHeight - rect.top + 8 });
    }
    setAccountOpen((v) => !v);
  };

  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden rounded-3xl bg-bg-white-0 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.03)] transition-[width] duration-200 ${
        collapsed ? "w-20" : "w-[264px]"
      }`}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto">
        <div className="flex w-full flex-col">
        <div className="flex w-full items-center gap-2.5 border-b border-stroke-soft-200 px-3.5 py-5">
          <img alt="Medeor" src={logo} className="size-10 shrink-0 rounded-[10.667px]" />
          {!collapsed && (
            <div className="flex min-w-0 flex-col items-start gap-2 whitespace-nowrap">
              <p className="font-sans text-[16px] font-semibold tracking-[-0.096px] text-text-strong-950">
                Medeor QBank
              </p>
              <p className="font-sans text-[12px] font-light tracking-[-0.072px] text-text-soft-400">
                Preparação para residência.
              </p>
            </div>
          )}
          <button
            type="button"
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
            onClick={() => setCollapsed((v) => !v)}
            className={`flex shrink-0 items-center justify-center rounded-2xl p-1.5 hover:bg-bg-soft-200 ${
              collapsed ? "" : "ml-auto"
            }`}
          >
            <img
              alt=""
              src={iconArrowDown01}
              className={`size-5 transition-transform ${collapsed ? "-rotate-90" : "rotate-90"}`}
            />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-[15px] overflow-hidden pb-[15px]">
          <img alt="" src={sidebarLine} className="h-0 w-full" />

          <div className="flex w-full flex-col items-start px-3.5">
            <div className="flex w-full items-center justify-between rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <img alt="" src={iconEstudar} className="size-5 shrink-0" />
                {!collapsed && (
                  <p className="whitespace-nowrap font-sans text-[12px] font-bold tracking-[-0.072px] text-[#62748e]">
                    Estudar
                  </p>
                )}
              </div>
              {!collapsed && <img alt="" src={iconArrowDown02} className="size-5 rotate-180" />}
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1.5 px-3.5">
            {studyItems.map((item) => (
              <div
                key={item.label}
                title={collapsed ? item.label : undefined}
                className={`flex h-[42px] w-full items-center gap-2 rounded-lg px-3 py-2 ${
                  collapsed ? "justify-center" : ""
                } ${item.active ? "bg-[#f1f5f9]" : ""}`}
              >
                <img alt="" src={item.icon} className="size-5 shrink-0" />
                {!collapsed && (
                  <p className="whitespace-nowrap font-sans text-[14px] font-light text-text-soft-400">
                    {item.label}
                  </p>
                )}
              </div>
            ))}
          </div>

          <img alt="" src={sidebarLine} className="h-0 w-full" />

          {groupHeaders.map((group) => (
            <div key={group.label} className="flex w-full flex-col items-start px-3.5">
              <div className="flex w-full items-center justify-between rounded-lg px-3 py-2">
                <div className="flex items-center gap-2">
                  <img alt="" src={group.icon} className="size-5 shrink-0" />
                  {!collapsed && (
                    <p className="whitespace-nowrap font-sans text-[12px] font-bold tracking-[-0.072px] text-[#62748e]">
                      {group.label}
                    </p>
                  )}
                </div>
                {!collapsed && <img alt="" src={group.arrow} className="size-5" />}
              </div>
            </div>
          ))}
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
                <button className="flex h-10 items-center rounded-xl bg-white px-3 py-2 text-[14px] text-[#183351]">
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

      <div ref={footerRef} className="relative flex w-full shrink-0 items-center gap-2.5 border-t border-stroke-soft-200 p-3">
        {collapsed ? (
          <button type="button" onClick={openAccountMenu} className="mx-auto shrink-0">
            <img alt="Conta" src={avatar} className="size-11 rounded-full object-cover" />
          </button>
        ) : (
          <button
            type="button"
            onClick={openAccountMenu}
            className="flex w-full items-center rounded-[15px] border border-stroke-soft-200 bg-bg-soft-200 py-2.5 pl-3 pr-2.5 text-left"
          >
            <div className="flex flex-1 items-center gap-2">
              <img alt="" src={avatar} className="size-11 shrink-0 rounded-full object-cover" />
              <div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                <p className="text-[14px] font-medium text-text-strong-950">Arthur Taylor</p>
                <p className="w-full truncate text-[12px] text-text-soft-400">arthur@testhive.com</p>
              </div>
              <img
                alt=""
                src={iconArrowDownDouble}
                className={`size-5 shrink-0 transition-transform ${accountOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
        )}
        {accountOpen && <AccountMenu anchor={accountAnchor} onClose={() => setAccountOpen(false)} />}
      </div>
    </aside>
  );
}
