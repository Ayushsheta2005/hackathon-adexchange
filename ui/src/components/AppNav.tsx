import type { JSX } from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }): string =>
  [
    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
    isActive
      ? "text-exchange-accent bg-exchange-accent/10 shadow-glow-cyan-sm"
      : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
  ].join(" ");

export function AppNav(): JSX.Element {
  return (
    <nav
      aria-label="Primary"
      className="mb-6 flex flex-wrap items-center gap-1 border-b border-white/5 pb-4"
    >
      <NavLink to="/" className={linkClass} end>
        DEMO exchange
      </NavLink>
      <NavLink to="/buyer" className={linkClass}>
        Nexus
      </NavLink>
    </nav>
  );
}
