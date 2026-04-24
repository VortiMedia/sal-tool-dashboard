import { Badge, Metric, PageHeader } from "@/components/ui";

const reports = [
  ["Policy valuation memo", "Ready", "ECONOMIC"],
  ["Portfolio simulation report", "Ready", "ECONOMIC"],
  ["A/E mortality report", "Review", "ANALYTICS"],
  ["Statutory reserve extract", "Draft", "STATUTORY"],
  ["AoVR-ready data package", "Draft", "STATUTORY"],
  ["Investor-safe anonymized report", "Ready", "SANITIZED"]
];

export default function ReportingPage() {
  return <>
    <PageHeader eyebrow="Compliance" title="Reporting ledger"><Badge tone="good">PII isolated</Badge></PageHeader>
    <section className="metrics">
      <Metric label="Economic runs" value="42" detail="valuation history" tone="good" />
      <Metric label="Statutory runs" value="7" detail="reserve basis" />
      <Metric label="Audit events" value="186" detail="immutable log" />
      <Metric label="Assumption sets" value="5" detail="2 approved" />
      <Metric label="PII access" value="0" detail="analytics engine" tone="good" />
      <Metric label="Exports" value="6" detail="report packages" />
    </section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card"><div className="card-head"><h2>Export queue</h2><Badge>Internal demo</Badge></div><div className="report-list">{reports.map(([name,status,ledger])=><div key={name} className="report-row"><b>{name}</b><span>{ledger}</span><em>{status}</em></div>)}</div></div>
      <div className="card callout"><h2>Privacy architecture</h2><article><b>Analytics never sees legal identity.</b><p>Production build must separate insured PII into a restricted domain; valuation, simulation, and investor exports operate only on anonymized insured IDs.</p></article><article><b>Every number needs lineage.</b><p>Store assumption set, premium schedule version, mortality table version, random seed, engine version, and input snapshot on every valuation run.</p></article></div>
    </section>
  </>;
}
