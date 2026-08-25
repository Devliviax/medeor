export default function PlanoDoDia() {
  return (
    <div className="flex w-full flex-col items-start rounded-3xl bg-bg-white-0 p-6">
      <div className="relative flex h-5 w-full items-center">
        <p className="text-[14px] font-medium tracking-[-0.1504px] text-[#15181e]">Plano de hoje</p>
        <p className="absolute right-0 text-[12px] text-[#6d7279]">48 min</p>
      </div>
      <h3 className="w-full max-w-[506px] pt-4 text-[20px] font-semibold leading-7 tracking-[-0.9492px] text-[#15181e]">
        Infecções do SNC: meningites e encefalites
      </h3>
      <p className="w-full max-w-[506px] pt-2 text-[14px] leading-5 tracking-[-0.1504px] text-[#6d7279]">
        Tema de alta incidência para UFES HUCAM. Ainda coletamos sinal suficiente sobre o seu
        desempenho neste foco.
      </p>
      <div className="w-full pt-5">
        <div className="w-full rounded-[20px] bg-[#ebf1f5] p-4">
          <p className="text-[14px] font-medium tracking-[-0.1504px] text-[#15181e]">Por que hoje</p>
          <p className="max-w-[474px] pt-1.5 text-[14px] leading-5 tracking-[-0.1504px] text-[#6d7279]">
            Tema incidente para a sua instituição de interesse, com peso 50 e dificuldade 50.
            Praticar agora calibra as próximas recomendações.
          </p>
        </div>
      </div>
      <div className="flex w-full gap-2 pt-5">
        <button
          className="flex h-10 items-center rounded-xl px-3 py-2 text-[14px] text-[#f9fafb]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, #183351 0%, #183351 100%)",
          }}
        >
          Praticar questões
        </button>
        <button className="flex items-center justify-center rounded-xl border border-stroke-soft-200 bg-bg-soft-200 px-3 py-2.5 text-[14px] text-text-sub-600 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]">
          Ver caderno de erros
        </button>
      </div>
    </div>
  );
}
