import { useState } from "react";
import iconViewDay from "../../assets/figma/icon_calendar-view-day.svg";
import iconViewWeek from "../../assets/figma/icon_calendar-view-week.svg";
import iconViewList from "../../assets/figma/icon_calendar-view-list.svg";
import iconChevronLeft from "../../assets/figma/icon_chevron-left.svg";
import iconChevronRight from "../../assets/figma/icon_chevron-right.svg";
import iconPlus from "../../assets/figma/icon_plus.svg";
import iconMoreDots from "../../assets/figma/icon_more-dots.svg";
import iconDelete from "../../assets/figma/icon_delete.svg";
import NovoCompromissoDialog from "./NovoCompromissoDialog";

type Event = { title: string; short: string; time: string; tone: "green" | "red" | "blue" };

type Day = { label: string; fullLabel: string; date: number; events: Event[] };

const days: Day[] = [
  {
    label: "Dom",
    fullLabel: "domingo",
    date: 16,
    events: [
      { title: "Leitura na aula", short: "Leitura na aula", time: "09:00", tone: "green" },
      { title: "Aula — Clinica Medica", short: "Aula", time: "11:00", tone: "green" },
      { title: "Simulado — 30 questoes", short: "Simulado", time: "15:00", tone: "red" },
    ],
  },
  { label: "Seg", fullLabel: "segunda", date: 17, events: [] },
  {
    label: "Ter",
    fullLabel: "terça",
    date: 18,
    events: [{ title: "Leitura na aula — Cardio", short: "Leitura na aula", time: "08:30", tone: "green" }],
  },
  { label: "Qua", fullLabel: "quarta", date: 19, events: [] },
  {
    label: "Qui",
    fullLabel: "quinta",
    date: 20,
    events: [{ title: "Aula ao vivo — Pediatria", short: "Aula", time: "19:30", tone: "green" }],
  },
  {
    label: "Sex",
    fullLabel: "sexta",
    date: 21,
    events: [{ title: "Simulado nacional", short: "Simulado", time: "09:00", tone: "red" }],
  },
  {
    label: "Sáb",
    fullLabel: "sábado",
    date: 22,
    events: [{ title: "Revisao de flashcards", short: "Revisão", time: "20:00", tone: "blue" }],
  },
];

const tones: Record<Event["tone"], { bg: string; dot: string; text: string }> = {
  green: { bg: "bg-[#daf7e3]", dot: "bg-[#349d62]", text: "text-[#349d62]" },
  red: { bg: "bg-[#ffe9e6]", dot: "bg-[#e7000b]", text: "text-[#e7000b]" },
  blue: { bg: "bg-[#ddf2ff]", dot: "bg-[#9fcbe6]", text: "text-[#0f1f37]" },
};

// Representative month grid for Ago 2026: trailing days from Jul, the full
// current-month range shown by the design, one row per week. The active
// week (16–22) pulls its dot indicators straight from `days` above so the
// two views never fall out of sync.
const monthWeeks: { date: number; currentMonth: boolean; events?: Event[] }[][] = [
  [26, 27, 28, 29, 30, 31, 1].map((date, i) => ({ date, currentMonth: i === 6 })),
  [2, 3, 4, 5, 6, 7, 8].map((date) => ({ date, currentMonth: true })),
  [9, 10, 11, 12, 13, 14, 15].map((date) => ({ date, currentMonth: true })),
  days.map((d) => ({ date: d.date, currentMonth: true, events: d.events })),
  [23, 24, 25, 26, 27, 28, 29].map((date) => ({ date, currentMonth: true })),
];

type View = "week" | "month" | "list";

const viewButtons: { view: View; icon: string; label: string }[] = [
  { view: "month", icon: iconViewDay, label: "Button - Mês" },
  { view: "week", icon: iconViewWeek, label: "Button - Semana" },
  { view: "list", icon: iconViewList, label: "Button - Lista" },
];

export default function AgendaSemana() {
  const [view, setView] = useState<View>("week");
  const [dialogOpen, setDialogOpen] = useState(false);

  const isEmpty = days.every((d) => d.events.length === 0);
  const listItems = days.flatMap((day) => day.events.map((ev) => ({ day, ev })));

  return (
    <div className="flex h-[366px] w-full flex-col items-start overflow-hidden rounded-[22.4px] bg-bg-white-0">
      <div className="flex w-full items-center gap-3 px-5 py-4">
        <h2 className="text-[18px] font-semibold tracking-[-0.8895px] text-[#0f1f37]">
          16 – 22 Ago 2026
        </h2>
        <button type="button" className="text-[14px] font-medium tracking-[-0.1504px] text-[rgba(15,31,55,0.8)]">
          Hoje
        </button>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-[#ecf1f5] p-1">
            {viewButtons.map((btn) => (
              <button
                key={btn.view}
                type="button"
                aria-label={btn.label}
                aria-pressed={view === btn.view}
                onClick={() => setView(btn.view)}
                className={`flex size-8 items-center justify-center rounded-full ${
                  view === btn.view ? "bg-bg-white-0 drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)]" : ""
                }`}
              >
                <img alt="" src={btn.icon} className="size-4" />
              </button>
            ))}
          </div>
          <button type="button" aria-label="Semana anterior" className="flex size-9 items-center justify-center rounded-xl">
            <img alt="" src={iconChevronLeft} className="size-4" />
          </button>
          <button type="button" aria-label="Próxima semana" className="flex size-9 items-center justify-center rounded-xl">
            <img alt="" src={iconChevronRight} className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Novo compromisso"
            onClick={() => setDialogOpen(true)}
            className="flex size-9 items-center justify-center rounded-full bg-[#152946] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)]"
          >
            <img alt="" src={iconPlus} className="size-4" />
          </button>
        </div>
      </div>

      {isEmpty && view !== "month" ? (
        <div className="flex w-full flex-1 items-center justify-center border-t border-[#e1e5ea] px-5 py-8">
          <p className="text-[14px] tracking-[-0.1504px] text-[#6a727d]">Nenhum compromisso nesta semana.</p>
        </div>
      ) : view === "week" ? (
        <>
          <div className="flex h-[221px] w-full items-stretch border-t border-[#e1e5ea]">
            {days.map((day, i) => (
              <div
                key={day.label}
                className={`flex min-h-[180px] flex-1 flex-col items-start overflow-y-auto p-2 ${
                  i < days.length - 1 ? "border-r border-[#e1e5ea]" : ""
                } ${day.events.length === 0 ? "bg-[rgba(236,241,245,0.6)]" : ""}`}
              >
                {day.events.map((ev, j) => (
                  <div key={j} className={`w-full rounded-[14.4px] px-2.5 py-2 ${j > 0 ? "mt-2" : ""} ${tones[ev.tone].bg}`}>
                    <div className="flex items-start gap-1.5">
                      <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${tones[ev.tone].dot}`} />
                      <p className={`text-[12px] font-black leading-4 ${tones[ev.tone].text}`}>{ev.title}</p>
                    </div>
                    <p className={`pt-0.5 text-[12px] leading-4 opacity-80 ${tones[ev.tone].text}`}>{ev.time}</p>
                  </div>
                ))}
                {day.events.length > 0 && (
                  <button type="button" className="mt-2 flex items-center justify-center rounded-[14.4px] py-2">
                    <img alt="" src={iconMoreDots} className="size-3.5" />
                  </button>
                )}
                {day.events.length === 0 && (
                  <button type="button" className="flex h-9 w-full items-center justify-center rounded-[14.4px] text-[14px] tracking-[-0.1504px] text-[#6a727d]">
                    —
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex w-full items-center px-1.5 py-4">
            {days.map((day) => (
              <div key={day.label} className="flex flex-1 flex-col items-center gap-0.5">
                <p className="text-[12px] text-[#6d7279]">{day.label}</p>
                <p className="text-[12px] font-medium text-[#15181e]">{day.date}</p>
              </div>
            ))}
          </div>
        </>
      ) : view === "month" ? (
        <div className="grid w-full flex-1 grid-cols-7 grid-rows-5 border-t border-[#e1e5ea]">
          {monthWeeks.map((week, wi) =>
            week.map((cell, ci) => (
              <div
                key={`${wi}-${ci}`}
                className={`flex flex-col items-start justify-center border-r border-b border-[#e1e5ea] p-2 ${
                  ci === week.length - 1 ? "border-r-0" : ""
                }`}
              >
                <p
                  className={`text-[12px] font-black leading-4 ${
                    cell.currentMonth ? "text-[#0f1f37]" : "text-[rgba(106,114,125,0.5)]"
                  }`}
                >
                  {cell.date}
                </p>
                {cell.events && cell.events.length > 0 && (
                  <div className="flex gap-1 pt-1">
                    {cell.events.map((ev, i) => (
                      <span key={i} className={`size-1.5 rounded-full ${tones[ev.tone].dot}`} />
                    ))}
                  </div>
                )}
              </div>
            )),
          )}
        </div>
      ) : (
        <div className="flex w-full flex-1 flex-col items-start overflow-y-auto border-t border-[#e1e5ea]">
          {listItems.map(({ day, ev }, i) => (
            <div
              key={i}
              className={`flex w-full items-center gap-3 px-5 py-3 ${
                i < listItems.length - 1 ? "border-b border-[#e1e5ea]" : ""
              }`}
            >
              <span className={`size-2 shrink-0 rounded-full ${tones[ev.tone].dot}`} />
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <p className="w-full truncate text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">{ev.title}</p>
                <p className="w-full truncate text-[12px] text-[#6a727d]">
                  {day.fullLabel} {day.date} · {ev.time} · {ev.short}
                </p>
              </div>
              <button type="button" aria-label="Remover" className="flex size-9 shrink-0 items-center justify-center rounded-xl">
                <img alt="" src={iconDelete} className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <NovoCompromissoDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
