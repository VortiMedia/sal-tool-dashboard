import { Donut, ScatterPlot } from "@/components/charts";
import { Badge, Metric, PageHeader } from "@/components/ui";
import { countBy, fmtMoney, policies, summary } from "@/lib/demo-data";

export default function PortfolioDashboard() {
  const opportunity = [...policies].sort((a,b)=>b.adjustedIrr-a.adjustedIrr)[0];
  const risk = [...policies].sort((a,b)=>b.leDeviation-a.leDeviation)[0];
  return <>
    <PageHeader eyebrow="Portfolio dashboard" title="Decision cockpit"><Badge tone="good">Fresh · Demo batch 04</Badge></PageHeader>
    <section className="hero"><div><span className="eyebrow">Sal-Tool / Local prototype</span><h2>Ten policies. One bottom-line view.</h2><p>Portfolio-level triage for life settlement acquisitions: score, IRR, adjusted life expectancy, underwriting deviation, and buy/pass pressure in one scan.</p></div><div className="fresh-strip"><span>Last parsed 4:12 PM</span><span>10 policies</span><span>0 real PII</span><span>Audit mode on</span></div></section>
    <section className="metrics">
      <Metric label="Policies" value={`${summary.policies}`} detail="current batch" />
      <Metric label="Avg score" value={`${summary.avgScore}`} detail="0–100 composite" tone="good" />
      <Metric label="Avg IRR" value={`${summary.avgIrr.toFixed(1)}%`} detail="original model" tone="good" />
      <Metric label="Adj. LE" value={`${summary.avgAdjustedLe.toFixed(1)}y`} detail="Platform 2 base" />
      <Metric label="LE deviation" value={`${summary.avgLeDeviation > 0 ? "+" : ""}${summary.avgLeDeviation.toFixed(1)}y`} detail="vs actuary" tone="warn" />
      <Metric label="Favorable UW" value={`${summary.favorableUw}/10`} detail="shorter/aligned LE" tone="good" />
    </section>
    <section className="grid two">
      <div className="card"><div className="card-head"><h2>Policy score vs IRR</h2><Badge>Buy zone: score 80+ / IRR 18%+</Badge></div><ScatterPlot policies={policies} /></div>
      <div className="grid">
        <div className="card"><div className="card-head"><h2>Recommendation mix</h2></div><Donut data={countBy(policies.map(p=>p.recommendation))} label="policies" /></div>
        <div className="card"><div className="card-head"><h2>Underwriting mix</h2></div><Donut data={countBy(policies.map(p=>p.underwriting))} label="records" /></div>
      </div>
    </section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card callout"><h2>Highest opportunity</h2><article><b>{opportunity.id} · {opportunity.carrier}</b><p>{opportunity.adjustedIrr}% adjusted IRR, {fmtMoney(opportunity.faceValue)} face, {opportunity.nlg} NLG. Platform 2 supports BUY: {opportunity.leDeviation}y LE deviation.</p></article></div>
      <div className="card callout"><h2>Highest risk</h2><article><b>{risk.id} · {risk.carrier}</b><p>{risk.leDeviation > 0 ? "+" : ""}{risk.leDeviation}y LE drift vs actuary, {risk.premiumFunding.toLowerCase()} premiums, {risk.confidence.toLowerCase()} confidence. Keep out of auto-buy lane.</p></article></div>
    </section>
  </>;
}
