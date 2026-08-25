import { useEffect, useRef } from "react";
import iconMessage from "../../assets/figma/notif_icon_message.svg";
import iconCpf from "../../assets/figma/notif_icon_cpf.svg";
import iconBell from "../../assets/figma/notif_icon_bell.svg";
import divider from "../../assets/figma/notif_divider.svg";

interface NotificationsDropdownProps {
  onClose: () => void;
}

export default function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-label="Notificações"
      className="absolute right-0 top-[calc(100%+12px)] z-50 flex w-[min(404px,calc(100vw-24px))] flex-col items-center overflow-hidden rounded-2xl bg-bg-white-0 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]"
    >
      <div className="flex max-h-[300px] w-full flex-col items-center gap-[18px] overflow-y-auto py-2">
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-start gap-4 px-5 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[5px] bg-[#99a0ae]">
            <div
              className="bg-white"
              style={{
                width: 26.483,
                height: 28.138,
                marginLeft: -2.48,
                marginTop: -3.31,
                WebkitMaskImage: `url(${iconMessage})`,
                maskImage: `url(${iconMessage})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "2.483px 3.31px",
                maskPosition: "2.483px 3.31px",
                WebkitMaskSize: "22.286px 24px",
                maskSize: "22.286px 24px",
              }}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <p className="text-[14px] font-medium tracking-[-0.15px] text-[#15181e]">
              Uma mensagem da equipe Medeor 💜
            </p>
            <p className="pt-[3px] text-[14px] tracking-[-0.15px] text-[#6d7279]">
              Ter acesso a uma educação de qualidade não precisa ser algo que pese no seu bolso ou custe uma fortuna.
            </p>
          </div>
        </div>
      </div>

      <img alt="" src={divider} className="h-0 w-full" />

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-start gap-4 px-5 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[5px] bg-[#99a0ae]">
            <img alt="" src={iconCpf} className="size-[19px]" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <p className="text-[14px] font-medium tracking-[-0.15px] text-[#15181e]">Atualize seu CPF/CNPJ</p>
            <p className="pt-[3px] text-[14px] tracking-[-0.15px] text-[#6d7279]">
              Para aproveitar uma experiência completa e personalizada, não deixe de adicionar seu CPF ou CNPJ no seu
              perfil.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-start gap-4 px-5 py-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-[5px] bg-[#99a0ae]">
            <img alt="" src={iconBell} className="size-5" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start">
            <p className="text-[14px] font-medium tracking-[-0.15px] text-[#15181e]">Ative as notificações</p>
            <p className="pt-[3px] text-[14px] tracking-[-0.15px] text-[#6d7279]">
              Receba lembretes importantes de estudo, acompanhe suas metas diárias e fique por dentro das novidades
              diretamente no seu navegador.
            </p>
          </div>
        </div>
      </div>
      </div>

      <img alt="" src={divider} className="h-0 w-full" />
      <button
        type="button"
        className="w-full shrink-0 px-5 py-3 text-center text-[14px] font-medium text-[#183351] hover:bg-bg-soft-200"
      >
        Ver todas as notificações
      </button>
    </div>
  );
}
