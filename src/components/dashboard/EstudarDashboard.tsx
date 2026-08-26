import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatCards from "./StatCards";
import PlanoDoDia from "./PlanoDoDia";
import ChecklistDoDia from "./ChecklistDoDia";
import LigaRanking from "./LigaRanking";
import AgendaSemana from "./AgendaSemana";
import QuestaoRelampago from "./QuestaoRelampago";
import AcoesRapidas from "./AcoesRapidas";

export default function EstudarDashboard() {
  return (
    <div className="flex min-h-screen w-full gap-3 overflow-x-auto bg-bg-weak-50 p-3 dark:bg-[#0e121b]">
      <div className="flex shrink-0 p-0">
        <Sidebar />
      </div>

      <div className="flex min-w-[820px] flex-1 flex-col overflow-hidden rounded-3xl shadow-[0px_0px_10px_rgba(0,0,0,0.1)]">
        <Topbar />

        <main className="flex flex-1 flex-col gap-6 bg-bg-soft-200 p-3 dark:bg-[#0e121b]">
          <StatCards />

          <div className="flex w-full gap-4">
            <PlanoDoDia />
            <ChecklistDoDia />
          </div>

          <LigaRanking />

          <div className="flex w-full gap-4">
            <div className="flex min-w-0 flex-1 flex-col">
              <AgendaSemana />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <QuestaoRelampago />
            </div>
          </div>

          <AcoesRapidas />
        </main>
      </div>
    </div>
  );
}
