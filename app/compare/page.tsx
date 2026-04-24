import { Bars, Radar } from "@/components/charts";
import { Badge, PageHeader } from "@/components/ui";
import { policies } from "@/lib/demo-data";

export default function ComparePage() {
  const selected = [policies[0], policies[4], policies[9]];
  return <>
    <PageHeader eyebrow="Compare" title="Policy face-off"><Badge>3 / 4 selected</Badge></PageHeader>
    <section className="card"><div className="card-head"><h2>Select policies</h2><Badge tone="good">Winner: {selected[0].id}</Badge></div><div className="chips">{policies.map((p)=><span className="chip" key={p.id}>{p.id} · {p.carrier} · {p.score}</span>)}</div></section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card"><div className="card-head"><h2>Multi-dimensional comparison</h2><Badge>normalized 0–100</Badge></div><Radar policies={selected} /></div>
      <div className="card"><div className="card-head"><h2>Adjusted IRR</h2></div><Bars items={selected} value={(p)=>p.adjustedIrr} label="Adjusted IRR compare" /><div className="callout" style={{marginTop:16}}><article><b>Why {selected[0].id} wins</b><p>Best balance of adjusted IRR, NLG protection, source quality, and low LE dispute risk. Not just highest return — highest trust-adjusted return.</p></article></div></div>
    </section>
  </>;
}
