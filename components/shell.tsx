"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowsLeftRight, ChartLineUp, ChartScatter, Files, Gauge, Pulse, Stack, ShieldCheck, Cpu } from "@phosphor-icons/react";

const nav = [
  { href: "/", label: "Portfolio", icon: Gauge },
  { href: "/platform-1", label: "Policy", icon: Files },
  { href: "/platform-2", label: "Underwriting", icon: Pulse },
  { href: "/simulation", label: "Simulation", icon: ChartLineUp },
  { href: "/ae", label: "A/E", icon: ChartScatter },
  { href: "/reporting", label: "Reporting", icon: ShieldCheck },
  { href: "/backend", label: "Backend", icon: Cpu },
  { href: "/compare", label: "Compare", icon: ArrowsLeftRight },
  { href: "/upload", label: "Upload", icon: Stack },
  { href: "/batch", label: "Batch", icon: Stack }
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><div>SC</div><span>Salabarria<br/>Capital</span></div>
      <nav>{nav.map(({ href, label, icon: Icon }) => <Link className={pathname === href ? "active" : ""} key={href} href={href}><Icon size={19} weight="duotone" />{label}</Link>)}</nav>
      <div className="side-note"><b>Local demo mode</b><span>No PII · No API · No cloud database</span></div>
    </aside>
    <main>{children}</main>
    <nav className="bottom-nav">{nav.slice(0,5).map(({ href, label, icon: Icon }) => <Link className={pathname === href ? "active" : ""} key={href} href={href}><Icon size={20} weight="duotone" /><span>{label}</span></Link>)}</nav>
  </div>;
}
