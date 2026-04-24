import { Badge, Metric, PageHeader } from "@/components/ui";
import { valuePolicy } from "@/lib/actuarial/valuation";
import { runPortfolioSimulation } from "@/lib/actuarial/simulation";
import { runAeAnalysis } from "@/lib/actuarial/ae";
import { demoAeInput, demoPolicyInput, demoPortfolioInputs } from "@/lib/backend/demo-portfolio";

export default function BackendPage() {
  const valuation = valuePolicy(demoPolicyInput("POL-001"));
  const simulation = runPortfolioSimulation({ portfolioId: "DEMO-PORTFOLIO-001", valuationDate: "2026-04-24", policies: demoPortfolioInputs().slice(0, 5), numPaths: 750, randomSeed: 12345 });
  const ae = runAeAnalysis(demoAeInput);
  return <>
    <PageHeader eyebrow="Backend" title="Math engine"><Badge tone="good">Live API logic · demo-safe</Badge></PageHeader>
    <section className="metrics">
      <Metric label="Policy PV" value={`$${Math.round(valuation.presentValue).toLocaleString()}`} detail={valuation.valuationRunId} tone="good" />
      <Metric label="Expected IRR" value={`${(valuation.expectedIrr * 100).toFixed(1)}%`} detail="probability-weighted DCF" />
      <Metric label="Max bid" value={`$${Math.round(valuation.maximumBidPrice).toLocaleString()}`} detail="at target IRR" tone="good" />
      <Metric label="Sim mean IRR" value={`${(simulation.meanIrr * 100).toFixed(1)}%`} detail={`${simulation.numPaths} paths`} />
      <Metric label="CTE 5" value={`${(simulation.cte5 * 100).toFixed(1)}%`} detail="worst tail" tone="bad" />
      <Metric label="A/E ratio" value={`${((ae.adjustedAeRatio ?? 0) * 100).toFixed(1)}%`} detail="IBNR adjusted" tone="warn" />
    </section>
    <section className="grid two" style={{marginTop:16}}>
      <div className="card callout"><h2>What is actually working now</h2><article><b>Policy valuation</b><p>Generates monthly survival curve, expected premium outflows, expected death benefit inflows, present value, expected IRR, and max bid price.</p></article><article><b>Portfolio simulation</b><p>Runs deterministic seeded mortality paths, calculates path IRRs, percentiles, CTE, negative IRR probability, and liquidity shortfall probability.</p></article><article><b>A/E mortality</b><p>Aggregates cohort actual deaths vs expected deaths, applies IBNR adjustment, and returns raw/adjusted A/E ratios.</p></article></div>
      <div className="card"><div className="card-head"><h2>API routes</h2><Badge>GET + POST</Badge></div><div className="endpoint-list">{[
        ["/api/v1/health", "engine status"],
        ["/api/v1/valuations/policy", "DCF / IRR / max bid"],
        ["/api/v1/simulations/portfolio", "Monte Carlo / CTE"],
        ["/api/v1/ae-analysis", "actual-to-expected mortality"]
      ].map(([route, desc])=><div key={route} className="endpoint-row"><code>{route}</code><span>{desc}</span></div>)}</div></div>
    </section>
  </>;
}
