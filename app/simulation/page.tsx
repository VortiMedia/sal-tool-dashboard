import { Bars } from "@/components/charts";
import { Badge, Metric, PageHeader } from "@/components/ui";
import { fmtMoney, policies, simulationSummary, summary } from "@/lib/demo-data";

export default function SimulationPage() {
  const downside = [...policies].sort((a, b) => a.adjustedIrr - b.adjustedIrr).slice(0, 6);
  return <>
    <PageHeader eyebrow="Monte Carlo" title="Simulation engine"><Badge tone="good">100,000 paths · seed 12345</Badge></PageHeader>
    <section className="hero simulation-hero">
      <div>
        <span className="eyebrow">Python orchestration / Rust kernel target</span>
        <h2>Return distribution before Sal wires capital.</h2>
        <p>Institutional life settlement math belongs in reproducible simulation runs: survival curves, premium burn, death benefit timing, IRR dispersion, liquidity shortfall, and CTE all visible in one operating screen.</p>
      </div>
      <div className="run-card">
        <span>Latest valuation run</span>
        <b>SIM-RUN-042</b>
        <small>ECONOMIC ledger · VBT demo table · constant force mortality</small>
      </div>
    </section>
    <section className="metrics">
      <Metric label="Mean IRR" value={`${simulationSummary.meanIrr}%`} detail="portfolio paths" tone="good" />
      <Metric label="Median IRR" value={`${simulationSummary.medianIrr}%`} detail="p50 outcome" />
      <Metric label="CTE 5" value={`${simulationSummary.cte5}%`} detail="worst 5% mean" tone="bad" />
      <Metric label="Negative IRR" value={`${simulationSummary.negativeIrr}%`} detail="path probability" tone="warn" />
      <Metric label="Liquidity shortfall" value={`${simulationSummary.liquidityShortfall}%`} detail="reserve breach" tone="warn" />
      <Metric label="Premium reserve" value={fmtMoney(summary.premiums * 4.2)} detail="modeled buffer" />
    </section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card"><div className="card-head"><h2>IRR percentile fan</h2><Badge>p01 → p99</Badge></div><div className="fan-chart">{simulationSummary.percentiles.map((p) => <div key={p.label} className="fan-row"><span>{p.label}</span><i style={{width:`${Math.max(8, p.width)}%`}} /><b>{p.value}%</b></div>)}</div></div>
      <div className="card"><div className="card-head"><h2>Downside contributors</h2></div><Bars items={downside} value={(p)=>Math.max(1, 25 - p.adjustedIrr)} label="Downside contribution" /></div>
    </section>
    <section className="grid three" style={{marginTop:16}}>
      {["Survival curve generated", "Expected cash flows projected", "Death times sampled", "IRR solved per path", "Portfolio cash flows aggregated", "Run metadata locked"].map((step, index)=><div className="card engine-step" key={step}><span>0{index+1}</span><b>{step}</b><p>Reproducible from valuation_run_id, assumption_set_id, premium schedule version, random seed, and engine version.</p></div>)}
    </section>
  </>;
}
