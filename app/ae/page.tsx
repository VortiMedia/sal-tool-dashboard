import { Badge, Metric, PageHeader } from "@/components/ui";
import { aeRows } from "@/lib/demo-data";

export default function AEPage() {
  return <>
    <PageHeader eyebrow="A/E mortality" title="Experience monitor"><Badge tone="warn">IBNR adjusted</Badge></PageHeader>
    <section className="metrics">
      <Metric label="Raw A/E" value="111.1%" detail="12 actual / 10.8 expected" tone="warn" />
      <Metric label="Adjusted A/E" value="115.7%" detail="IBNR applied" tone="warn" />
      <Metric label="Exposure" value="8,942d" detail="portfolio days" />
      <Metric label="Actual deaths" value="12" detail="confirmed claims" />
      <Metric label="Expected deaths" value="10.8" detail="selected assumptions" />
      <Metric label="Confidence" value="Medium" detail="immature cohort" />
    </section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card"><div className="card-head"><h2>Claims triangle</h2><Badge>Demo cohorts</Badge></div><div className="triangle-table">{aeRows.map((row)=><div key={row.cohort} className="triangle-row"><b>{row.cohort}</b><span>{row.duration1}</span><span>{row.duration2}</span><span>{row.duration3}</span><em>{row.ae}</em></div>)}</div></div>
      <div className="card callout"><h2>Interpretation</h2><article><b>Mortality is slightly faster than model.</b><p>Good for near-term return realization, but do not overfit. The portfolio is still young; distribution methodology beats point-estimate LE comparisons here.</p></article><article><b>Segment before changing assumptions.</b><p>Break by vintage, impairment band, carrier, settlement type, and multiplier before touching pricing tables.</p></article></div>
    </section>
  </>;
}
