import { Donut } from "@/components/charts";
import { Badge, Metric, PageHeader } from "@/components/ui";
import { countBy, fmtMoney, policies, summary } from "@/lib/demo-data";

export default function BatchPage() {
  return <>
    <PageHeader eyebrow="Batch" title="Vintage summary"><Badge tone="good">Fund batch 04 · demo</Badge></PageHeader>
    <section className="capital"><div><span>Face value</span><b>{fmtMoney(summary.face)}</b></div><div><span>Capital deployed</span><b>{fmtMoney(summary.capital)}</b></div><div><span>Annual premiums</span><b>{fmtMoney(summary.premiums)}</b></div></section>
    <section className="metrics" style={{marginTop:16}}>
      <Metric label="Avg score" value={`${summary.avgScore}`} detail="Platform 1" tone="good" />
      <Metric label="Avg IRR" value={`${summary.avgIrr.toFixed(1)}%`} detail="original" />
      <Metric label="Avg adj. IRR" value={`${summary.avgAdjustedIrr.toFixed(1)}%`} detail="underwriting adjusted" tone="good" />
      <Metric label="Avg adj. LE" value={`${summary.avgAdjustedLe.toFixed(1)}y`} detail="Platform 2" />
      <Metric label="Favorable UW" value={`${summary.favorableUw}/10`} detail="records" tone="good" />
      <Metric label="Buy lane" value={`${policies.filter(p=>p.recommendation==='BUY').length}`} detail="priority policies" tone="good" />
    </section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card"><div className="card-head"><h2>Platform 1 recommendations</h2></div><Donut data={countBy(policies.map(p=>p.recommendation))} label="policies" /></div>
      <div className="card"><div className="card-head"><h2>Platform 2 underwriting</h2></div><Donut data={countBy(policies.map(p=>p.underwriting))} label="insureds" /></div>
    </section>
    <section className="card callout" style={{marginTop:16}}><h2>Batch readout</h2><article><b>6 policies belong in buy/review priority.</b><p>Capital allocation should overweight policies where Platform 2 shortens LE and Platform 1 shows protected NLG, adequate premiums, and high data quality.</p></article></section>
  </>;
}
