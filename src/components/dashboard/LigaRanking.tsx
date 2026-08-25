import leagueAvatar from "../../assets/figma/dash_league_avatar.png";
import iconLeagueBadge from "../../assets/figma/icon_league_badge.svg";
import ringTrack from "../../assets/figma/dash_league_ring_vector.svg";
import ringProgress from "../../assets/figma/dash_league_ring_vector2.svg";

const weeks = ["1–10 Ago", "11–20 Ago", "21–30 Ago", "31 Ago–9 Set", "10–19 Set"];

const ranking = [
  { pos: 472, name: "estudante_6711", pts: 36 },
  { pos: 473, name: "estudante_8887", pts: 36 },
  { pos: 474, name: "você", pts: 35, you: true },
  { pos: 475, name: "cordial_neuronio", pts: 35 },
  { pos: 476, name: "veloz_microscopio", pts: 35 },
];

export default function LigaRanking() {
  return (
    <div className="flex h-[304px] w-full flex-col items-start rounded-[22px] bg-bg-white-0 p-6">
      <div className="flex w-full items-center justify-between">
        <p className="text-[14px] font-medium tracking-[-0.1504px] text-[#020618]">Corrida da liga</p>
        <p className="text-[12px] text-[#62748e]">Ranking</p>
      </div>

      <div className="flex w-full items-center gap-8 pt-6">
        <div className="flex w-[256px] items-center gap-4">
          <div className="relative size-24 shrink-0">
            <img alt="" src={ringTrack} className="absolute inset-0 size-full" />
            <img alt="" src={ringProgress} className="absolute inset-x-0 top-0 w-full" />
            <div className="absolute inset-0 flex items-center justify-center p-[5px]">
              <img alt="" src={leagueAvatar} className="size-full rounded-full object-cover" />
              <img alt="" src={iconLeagueBadge} className="absolute size-6" />
            </div>
            <div className="absolute -bottom-1 left-1/2 flex h-[19px] w-10 -translate-x-1/2 items-center justify-center gap-px rounded-full bg-[#0f172b] px-2 py-0.5">
              <span className="text-[10px] font-medium text-[#f8fafc]">35</span>
              <span className="text-[7px] font-medium text-[#f8fafc]">Pts</span>
            </div>
          </div>
          <div className="flex w-36 flex-col items-start">
            <p className="text-[14px] font-black tracking-[-0.1504px] text-[#020618]">Liga Calouro</p>
            <p className="pt-1 text-[12px] leading-[19.5px] text-[#62748e]">
              Faltam 485 pontos para Acadêmico
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center gap-8">
          <div className="h-full flex-[540] rounded-[22px] bg-[rgba(235,241,245,0.5)] p-4">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="flex w-full flex-1 items-end justify-between border-b border-dashed border-[#dfe5ea] pb-1">
                {weeks.map((w) => (
                  <div key={w} className="flex flex-1 flex-col items-center gap-1">
                    <div className="h-10 w-[34px] rounded-[12px] bg-[#9fcbe6]" />
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-between pt-2">
                {weeks.map((w) => (
                  <span key={w} className="flex-1 text-center text-[10px] text-[#6a7683]">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex w-56 flex-col gap-2">
            {ranking.map((r) => (
              <div
                key={r.pos}
                className={`flex items-center gap-3 rounded-[18px] px-3 py-2 ${
                  r.you ? "bg-[#ebf1f5]" : "bg-[rgba(235,241,245,0.4)]"
                }`}
              >
                <span className={`text-[12px] ${r.you ? "font-medium" : ""} text-[#6a7683]`}>
                  {r.pos}
                </span>
                <span
                  className={`flex-1 truncate text-[14px] tracking-[-0.1504px] text-[#112a43] ${
                    r.you ? "font-medium" : ""
                  }`}
                >
                  {r.name}
                </span>
                <span className={`text-[12px] ${r.you ? "font-medium" : ""} text-[#6a7683]`}>
                  {r.pts}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
