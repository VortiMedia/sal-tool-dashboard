import type { Policy } from "@/lib/demo-data";

const recColor: Record<string, string> = { BUY: "#20c997", REVIEW: "#f4b740", PASS: "#ff6b6b", Favorable: "#20c997", Neutral: "#9aa4b2", Unfavorable: "#ff6b6b" };

export function ScatterPlot({ policies }: { policies: Policy[] }) {
  return (
    <div className="chart-frame scatter">
      <div className="axis y">Score</div><div className="axis x">IRR</div>
      {policies.map((p) => (
        <div key={p.id} className={`dot ${p.recommendation.toLowerCase()}`} style={{ left: `${((p.irr - 7) / 18) * 100}%`, bottom: `${((p.score - 45) / 55) * 100}%` }}>
          <span>{p.id.replace("POL-", "")}</span>
        </div>
      ))}
      <div className="target-line vertical" /><div className="target-line horizontal" />
    </div>
  );
}

export function Donut({ data, label }: { data: Record<string, number>; label: string }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  let start = 0;
  const stops = Object.entries(data).map(([key, value]) => {
    const pct = (value / total) * 100;
    const segment = `${recColor[key] ?? "#8da0bd"} ${start}% ${start + pct}%`;
    start += pct;
    return segment;
  }).join(", ");
  return (
    <div className="donut-wrap">
      <div className="donut" style={{ background: `conic-gradient(${stops})` }}><b>{total}</b><span>{label}</span></div>
      <div className="legend">
        {Object.entries(data).map(([k, v]) => <div key={k}><i style={{ background: recColor[k] ?? "#8da0bd" }} />{k}<b>{v}</b></div>)}
      </div>
    </div>
  );
}

export function Bars({ items, value, label }: { items: Policy[]; value: (p: Policy) => number; label: string }) {
  const max = Math.max(...items.map(value));
  return <div className="bars" aria-label={label}>{items.map((p) => <div className="bar-row" key={p.id}><span>{p.id}</span><div><i style={{ width: `${(value(p) / max) * 100}%` }} /></div><b>{value(p).toFixed(1)}%</b></div>)}</div>;
}

export function Radar({ policies }: { policies: Policy[] }) {
  const metrics = ["Score", "IRR", "MOIC", "NLG", "Quality", "Risk"];
  return (
    <div className="radar-card">
      <svg viewBox="0 0 260 260" role="img" aria-label="Policy comparison radar">
        {[100, 75, 50, 25].map((r) => <polygon key={r} points={poly(metrics.map((_, i) => point(i, metrics.length, r)))} fill="none" stroke="rgba(255,255,255,.13)" />)}
        {metrics.map((m, i) => { const [x,y]=point(i, metrics.length, 112); return <text key={m} x={130+x} y={130+y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#98a2b3">{m}</text>; })}
        {policies.map((p, idx) => {
          const vals = [p.score, p.irr * 4, p.moic * 25, p.nlg === "Protected" ? 92 : p.nlg === "Partial" ? 62 : 30, p.dataQuality, 100 - (p.risk === "Low" ? 15 : p.risk === "Medium" ? 45 : 75)];
          const color = ["#20c997", "#77a7ff", "#f4b740", "#ff6b6b"][idx];
          return <polygon key={p.id} points={poly(vals.map((v, i) => point(i, vals.length, Math.min(v,100))))} fill={color + "35"} stroke={color} strokeWidth="2" />;
        })}
      </svg>
    </div>
  );
}

function point(i: number, total: number, radius: number) { const angle = -Math.PI / 2 + (i * 2 * Math.PI) / total; return [Math.cos(angle) * radius, Math.sin(angle) * radius] as const; }
function poly(points: readonly (readonly [number, number])[]) { return points.map(([x, y]) => `${130 + x},${130 + y}`).join(" "); }
