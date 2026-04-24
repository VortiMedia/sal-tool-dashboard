import { Badge, Metric, PageHeader } from "@/components/ui";
import { policies } from "@/lib/demo-data";

export default function PlatformTwoPage() {
  const p = policies[9];
  return <>
    <PageHeader eyebrow="Platform 2" title="Underwriting intelligence"><Badge tone="good">Favorable · High confidence</Badge></PageHeader>
    <section className="uw-hero">
      <div className="le-block">
        <span className="eyebrow">Life expectancy challenge</span>
        <h2>{p.id} / {p.insured}</h2>
        <p>Platform 2 disputes the provider estimate and moves the base case shorter, lifting adjusted IRR while keeping conservative scenario visible.</p>
        <div className="le-numbers"><div><span>Actuary</span><b>{p.le.toFixed(1)}y</b></div><div><span>Platform base</span><b>{p.adjustedLe.toFixed(1)}y</b></div><div><span>Deviation</span><b>{p.leDeviation.toFixed(1)}y</b></div></div>
        <div className="range"><i style={{left:"28%"}}/><i style={{left:"46%", background:"#77a7ff"}}/><i style={{left:"62%", background:"#f4b740"}}/></div>
        <p><b>Rationale:</b> COPD, frailty, and weight loss indicate accelerated decline. Actuary LE appears generous against recent clinical trajectory.</p>
      </div>
      <div className="decision good">{p.underwriting}<small>{p.confidence} confidence</small></div>
    </section>
    <section className="metrics" style={{marginTop:16}}>
      <Metric label="Original IRR" value={`${p.irr}%`} detail="Platform 1" />
      <Metric label="Adjusted IRR" value={`${p.adjustedIrr}%`} detail="after UW" tone="good" />
      <Metric label="Source coverage" value={`${p.sourceAvailability}%`} detail="records available" />
      <Metric label="Data quality" value={`${p.dataQuality}%`} detail="field confidence" tone="good" />
      <Metric label="Risk level" value={p.risk} detail="mortality + policy" />
      <Metric label="Linked score" value={`${p.score}`} detail="policy score" tone="good" />
    </section>
    <section className="grid three" style={{marginTop:16}}>
      <div className="card"><h2>Primary mortality drivers</h2><div className="driver-list" style={{marginTop:12}}>{p.mortalityDrivers.map((d)=><div key={d}><b>{d}</b><p>Material to LE adjustment and scenario weighting.</p></div>)}</div></div>
      <div className="card"><h2>Trust check</h2><div className="quality" style={{marginTop:14}}>{[["Medical records",92],["Medication history",88],["Recent labs",76],["Actuary report",100],["Missing/conflicts",18]].map(([label,val])=><div className="quality-row" key={label as string}><span>{label}</span><div><i style={{width:`${val}%`}}/></div></div>)}</div></div>
      <div className="card callout"><h2>Investment impact</h2><article><b>+{(p.adjustedIrr-p.irr).toFixed(1)} pts IRR</b><p>Shorter adjusted LE improves base-case returns. Conservative scenario still clears review threshold; aggressive case moves to priority buy.</p></article><article><b>Audit trail required</b><p>Every LE adjustment must cite source pages, confidence, and missing evidence before Sal trusts the machine.</p></article></div>
    </section>
  </>;
}
