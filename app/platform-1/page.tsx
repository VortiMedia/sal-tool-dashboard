import { DetailMemo, PageHeader, PolicyCard, Badge, Metric } from "@/components/ui";
import { Bars } from "@/components/charts";
import { fmtMoney, policies, summary } from "@/lib/demo-data";

export default function PlatformOnePage() {
  const selected = policies[0];
  return <>
    <PageHeader eyebrow="Platform 1" title="Policy intelligence"><Badge tone="good">BUY / REVIEW / PASS engine</Badge></PageHeader>
    <section className="metrics">
      <Metric label="Face value" value={fmtMoney(summary.face)} detail="total batch" tone="good" />
      <Metric label="Capital needed" value={fmtMoney(summary.capital)} detail="purchase prices" />
      <Metric label="Annual premiums" value={fmtMoney(summary.premiums)} detail="ongoing funding" tone="warn" />
      <Metric label="Avg score" value={`${summary.avgScore}`} detail="risk-adjusted" tone="good" />
      <Metric label="Avg IRR" value={`${summary.avgIrr.toFixed(1)}%`} detail="original model" />
      <Metric label="Avg adj. IRR" value={`${summary.avgAdjustedIrr.toFixed(1)}%`} detail="after LE challenge" tone="good" />
    </section>
    <DetailMemo policy={selected} />
    <section className="grid two" style={{marginTop:16}}>
      <div className="card"><div className="card-head"><h2>Policy queue</h2><Badge>Demo data · anonymized</Badge></div><div className="policy-grid">{policies.slice(0,6).map((policy) => <PolicyCard key={policy.id} policy={policy} />)}</div></div>
      <div className="card"><div className="card-head"><h2>Adjusted return rank</h2></div><Bars items={[...policies].sort((a,b)=>b.adjustedIrr-a.adjustedIrr).slice(0,8)} value={(p)=>p.adjustedIrr} label="Adjusted IRR ranking" /></div>
    </section>
  </>;
}
