import { useEffect, useState } from "react";
import iconClose from "../../assets/figma/icon_close.svg";
import iconChevronDown from "../../assets/figma/icon_chevron-down.svg";
import iconCategoryProva from "../../assets/figma/icon_category-prova.svg";
import iconCategoryAula from "../../assets/figma/icon_category-aula.svg";
import iconCategoryEstudo from "../../assets/figma/icon_category-estudo.svg";
import iconCategoryLembrete from "../../assets/figma/icon_category-lembrete.svg";
import iconCategoryPessoal from "../../assets/figma/icon_category-pessoal.svg";
import iconCategoryMentoria from "../../assets/figma/icon_category-mentoria.svg";

type Category = "Prova" | "Aula" | "Estudo" | "Lembrete" | "Pessoal" | "Mentoria";

const categories: { value: Category; icon: string }[] = [
  { value: "Prova", icon: iconCategoryProva },
  { value: "Aula", icon: iconCategoryAula },
  { value: "Estudo", icon: iconCategoryEstudo },
  { value: "Lembrete", icon: iconCategoryLembrete },
  { value: "Pessoal", icon: iconCategoryPessoal },
  { value: "Mentoria", icon: iconCategoryMentoria },
];

type Props = { open: boolean; onClose: () => void };

export default function NovoCompromissoDialog({ open, onClose }: Props) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState<Category>("Estudo");
  const [diaInteiro, setDiaInteiro] = useState(false);
  const [dataInicio, setDataInicio] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [descricao, setDescricao] = useState("");
  const [repeticao, setRepeticao] = useState("Não repetir");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="novo-compromisso-title"
        className="relative flex w-full max-w-[510px] max-h-[90vh] flex-col gap-4 overflow-y-auto rounded-[14.4px] border border-[#e1e5ea] bg-bg-white-0 p-6 drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]"
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-[10.4px] opacity-70"
        >
          <img alt="" src={iconClose} className="size-4" />
        </button>

        <div className="flex flex-col items-start">
          <h2 id="novo-compromisso-title" className="pb-1.5 text-[18px] font-black leading-[18px] tracking-[-0.8895px] text-[#0f1f37]">
            Novo compromisso
          </h2>
          <p className="text-[14px] leading-5 tracking-[-0.1504px] text-[#6a727d]">
            Preencha os detalhes do compromisso.
          </p>
        </div>

        <form className="flex flex-col items-start gap-4" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col items-start gap-1.5">
            <label htmlFor="titulo" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
              Título *
            </label>
            <input
              id="titulo"
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex.: Simulado — 90 questões"
              className="h-9 w-full rounded-[12.4px] border border-[#e1e5ea] px-3 py-1 text-[14px] tracking-[-0.1504px] text-[#0f1f37] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] placeholder:text-[#6a727d] focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col items-start gap-1.5">
            <span className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">Categoria</span>
            <div className="grid w-full grid-cols-3 gap-2">
              {categories.map((cat) => {
                const active = categoria === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategoria(cat.value)}
                    className={`flex items-center gap-2 rounded-[14.4px] border p-2 text-[14px] tracking-[-0.1504px] ${
                      active
                        ? "border-[#152946] bg-[rgba(21,41,70,0.1)] text-[#0f1f37]"
                        : "border-[#e1e5ea] bg-bg-white-0 text-[#6a727d]"
                    }`}
                  >
                    <img alt="" src={cat.icon} className="size-4" />
                    <span>{cat.value}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex w-full items-center justify-between rounded-[18.4px] border border-[#e1e5ea] px-3 py-2.5">
            <div className="flex flex-col items-start">
              <span className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">Dia inteiro</span>
              <span className="text-[12px] text-[#6a727d]">Marque se durar o dia todo.</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={diaInteiro}
              onClick={() => setDiaInteiro((v) => !v)}
              className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)] transition-colors ${
                diaInteiro ? "justify-end bg-[#152946]" : "justify-start bg-[#e1e5ea]"
              }`}
            >
              <span className="size-4 rounded-full bg-[#f4f7fa] shadow-[0px_1px_2px_rgba(0,0,0,0.15)]" />
            </button>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <div className="flex flex-col items-start gap-1.5">
              <label htmlFor="data-inicio" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
                Início
              </label>
              <input
                id="data-inicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="h-9 w-full rounded-[12.4px] border border-[#e1e5ea] px-3 text-[14px] tracking-[-0.1504px] text-[#0f1f37] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <label htmlFor="hora-inicio" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
                Hora início
              </label>
              <input
                id="hora-inicio"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="h-9 w-full rounded-[12.4px] border border-[#e1e5ea] px-3 text-[14px] tracking-[-0.1504px] text-[#0f1f37] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3">
            <div className="flex flex-col items-start gap-1.5">
              <label htmlFor="data-fim" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
                Fim
              </label>
              <input
                id="data-fim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="h-9 w-full rounded-[12.4px] border border-[#e1e5ea] px-3 text-[14px] tracking-[-0.1504px] text-[#0f1f37] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] focus:outline-none"
              />
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <label htmlFor="hora-fim" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
                Hora fim
              </label>
              <input
                id="hora-fim"
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
                className="h-9 w-full rounded-[12.4px] border border-[#e1e5ea] px-3 text-[14px] tracking-[-0.1504px] text-[#0f1f37] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-1.5">
            <label htmlFor="descricao" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
              Descrição
            </label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Adicione detalhes..."
              rows={3}
              className="min-h-[60px] w-full resize-none rounded-[12.4px] border border-[#e1e5ea] px-3 py-2 text-[14px] tracking-[-0.1504px] text-[#0f1f37] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] placeholder:text-[#6a727d] focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col items-start gap-1.5">
            <label htmlFor="repeticao" className="text-[14px] font-medium tracking-[-0.1504px] text-[#0f1f37]">
              Repetição
            </label>
            <div className="relative w-full">
              <select
                id="repeticao"
                value={repeticao}
                onChange={(e) => setRepeticao(e.target.value)}
                className="h-9 w-full appearance-none rounded-[12.4px] border border-[#e1e5ea] px-3 text-[14px] tracking-[-0.1504px] text-[#0f1f37] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)] focus:outline-none"
              >
                <option>Não repetir</option>
                <option>Diariamente</option>
                <option>Semanalmente</option>
                <option>Mensalmente</option>
              </select>
              <img
                alt=""
                src={iconChevronDown}
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-end">
            <button
              type="submit"
              className="flex h-9 items-center justify-center rounded-[12.4px] bg-[#152946] px-4 py-2 text-[14px] font-medium tracking-[-0.1504px] text-[#f6f9fc] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)]"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
