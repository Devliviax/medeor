import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { User02Icon, CardExchange01Icon, CustomerSupportIcon, Logout01Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "../../contexts/ThemeContext";
import divider from "../../assets/figma/account_divider.svg";
import darkDivider from "../../assets/figma/dark/account_divider.svg";

interface AccountMenuProps {
  onClose: () => void;
  anchor: { left: number; bottom: number };
}

const items: { icon: IconSvgElement; label: string }[] = [
  { icon: User02Icon, label: "Perfil" },
  { icon: CardExchange01Icon, label: "Assinatura" },
  { icon: CustomerSupportIcon, label: "Suporte" },
];

export default function AccountMenu({ onClose, anchor }: AccountMenuProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    const scrollTimer = window.setTimeout(() => window.addEventListener("scroll", onClose), 150);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("scroll", onClose);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label="Conta"
      style={{ left: anchor.left, bottom: anchor.bottom }}
      className="fixed z-50 flex w-64 flex-col items-center rounded-2xl bg-bg-white-0 py-2 shadow-[0px_0px_10px_rgba(0,0,0,0.1)] dark:bg-[#181b25]"
    >
      <div className="flex w-full flex-col items-start px-2.5 py-2">
        <p className="text-[14px] font-medium text-text-strong-950 dark:text-[#f8fafc]">Arthur Taylor</p>
        <p className="text-[12px] text-text-soft-400 dark:text-[#94a3b8]">arthur@testhive.com</p>
      </div>

      <img alt="" src={isDark ? darkDivider : divider} className="h-0 w-full" />

      <div className="flex w-full flex-col gap-1.5 px-2.5 py-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            className="flex h-[42px] w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-bg-soft-200 dark:hover:bg-[#222530]"
          >
            <HugeiconsIcon icon={item.icon} size={20} className="shrink-0 text-[#99a0ae] dark:text-[#94a3b8]" />
            <span className="text-[14px] font-light text-text-soft-400 dark:text-[#94a3b8]">{item.label}</span>
          </button>
        ))}
      </div>

      <img alt="" src={isDark ? darkDivider : divider} className="h-0 w-full" />

      <div className="flex w-full flex-col items-start px-2.5 pt-2">
        <button
          type="button"
          className="flex h-[42px] w-full items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-bg-soft-200 dark:hover:bg-[#222530]"
        >
          <HugeiconsIcon icon={Logout01Icon} size={20} className="shrink-0 text-[#f5707b]" />
          <span className="text-[14px] font-light text-[#fb2c36]">Sair</span>
        </button>
      </div>
    </div>,
    document.body,
  );
}
