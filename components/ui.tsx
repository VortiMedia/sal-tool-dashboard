import type { Policy } from "@/lib/demo-data";
import { fmtMoney } from "@/lib/demo-data";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <header className="page-header"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div>{children}</header>;
}

export function Metric({ label, value, detail, tone = "neutral" }: { label: string; value: string; detail: string; tone?: "neutral" | "good" | "warn" | "bad" }) {
  return <div className={`metric ${tone}`}><span>{label}</span><b>{value}</b><small>{detail}</small></div>;
}

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "good" | "warn" | "bad" | "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export function PolicyCard({ policy }: { policy: Policy }) {
  const tone = policy.recommendation === "BUY" ? "good" : policy.recommendation === "REVIEW" ? "warn" : "bad";
  return <article className="policy-card">
    <div className="policy-top"><div><b>{policy.id}</b><span>{policy.carrier} · {policy.insured}</span></div><Badge tone={tone}>{policy.recommendation}</Badge></div>
    <div className="score-ring" style={{ background: `conic-gradient(var(--${tone}) ${policy.score}%, rgba(255,255,255,.08) 0)` }}><b>{policy.score}</b><span>score</span></div>
    <div className="mini-grid"><span>IRR <b>{policy.irr}%</b></span><span>Adj. IRR <b>{policy.adjustedIrr}%</b></span><span>MOIC <b>{policy.moic}x</b></span><span>LE <b>{policy.adjustedLe}y</b></span></div>
  </article>;
}

export function DetailMemo({ policy }: { policy: Policy }) {
  const tone = policy.recommendation === "BUY" ? "good" : policy.recommendation === "REVIEW" ? "warn" : "bad";
  return <section className="card memo">
    <div className="memo-hero"><div><span>Selected policy memo</span><h2>{policy.id} · {policy.carrier}</h2><p>Decision layer favors <b>{policy.recommendation}</b> because adjusted return holds after LE challenge and premium funding is {policy.premiumFunding.toLowerCase()}.</p></div><div className={`decision ${tone}`}>{policy.recommendation}<small>{policy.score}/100</small></div></div>
    <div className="memo-grid">
      <div><span>Face value</span><b>{fmtMoney(policy.faceValue)}</b></div><div><span>Purchase price</span><b>{fmtMoney(policy.purchasePrice)}</b></div><div><span>Annual premium</span><b>{fmtMoney(policy.annualPremium)}</b></div><div><span>NLG</span><b>{policy.nlg}</b></div><div><span>Contestability</span><b>{policy.contestability}</b></div><div><span>Suicide clause</span><b>{policy.suicideClause}</b></div>
    </div>
    <div className="risk-flags">{[policy.risk + " risk", policy.premiumFunding + " premiums", policy.confidence + " confidence", ...policy.mortalityDrivers].map((f) => <span key={f}>{f}</span>)}</div>
  </section>;
}
