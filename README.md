# Sal-Tool Dashboard Prototype

Visual-first local demo for Salabarria Capital's life settlement policy intelligence dashboard.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Gates

```bash
npm run lint
npm run typecheck
npm run build
```

## Notes

- Demo/mock data only.
- No PII.
- No external APIs.
- No cloud database.
- Built as the visual operating-room prototype before real extraction/scoring is wired.


## Designer / LLM context

See `DESIGNER_CONTEXT.xml` for LLM-ingestible UX, brand, IA, and product notes.

## Live prototype

https://sal-tool-dashboard.vercel.app

## GitHub

https://github.com/VortiMedia/sal-tool-dashboard

## Working backend prototype

This repo now includes a demo-safe actuarial backend layer, not just UI screens. Current endpoints:

- `GET /api/v1/health` — engine status and route list
- `GET|POST /api/v1/valuations/policy` — monthly survival curve, expected premium outflows, expected death benefit inflows, PV, expected IRR, max bid price, run diagnostics
- `GET|POST /api/v1/simulations/portfolio` — deterministic seeded portfolio mortality simulation, IRR distribution, percentiles, CTE, negative IRR probability, liquidity shortfall probability
- `GET|POST /api/v1/ae-analysis` — actual-to-expected mortality analysis with IBNR adjustment and cohort rows

Important: this is still prototype/demo logic. It does not persist sensitive data, does not store real PII, and is not yet a production secure database/Rust engine.
