import { valuePolicy } from '../lib/actuarial/valuation.ts';
import { runPortfolioSimulation } from '../lib/actuarial/simulation.ts';
import { runAeAnalysis } from '../lib/actuarial/ae.ts';

function premiumSchedule(annualPremium) {
  return Array.from({ length: 120 }, (_, index) => {
    const date = new Date('2026-04-24T00:00:00.000Z');
    date.setUTCMonth(date.getUTCMonth() + index + 1);
    return { date: date.toISOString().slice(0, 10), amount: annualPremium / 12 };
  });
}

function policy(policyId, age, deathBenefit, acquisitionCost, annualPremium, multiplier) {
  return {
    policyId,
    valuationDate: '2026-04-24',
    settlementType: 'STANDARD_LIFE_SETTLEMENT',
    deathBenefit,
    acquisitionCost,
    insured: { anonymizedInsuredId: `${policyId}-INS`, birthDate: `${2026 - age}-01-01`, sex: 'M', smokerStatus: 'UNKNOWN' },
    mortality: { tableId: 'DEMO_VBT_2015', mortalityMultiplier: multiplier, fractionalAgeAssumption: 'CONSTANT_FORCE' },
    premiumSchedule: premiumSchedule(annualPremium),
    discountRate: 0.12,
    targetIrr: 0.15,
    terminalAge: 120,
    expenseLoad: acquisitionCost * 0.015,
    reserveRequirement: annualPremium * 2,
    ledgerType: 'ECONOMIC'
  };
}

const policies = [
  policy('POL-001', 78, 2500000, 610000, 58000, 1.1),
  policy('POL-002', 73, 1800000, 450000, 42000, 1.03),
  policy('POL-003', 81, 3200000, 980000, 76000, 0.93)
];
const valuation = valuePolicy(policies[0]);
if (!Number.isFinite(valuation.expectedIrr) || valuation.expectedCashFlows.length === 0) throw new Error('valuation failed');
const simulation = runPortfolioSimulation({ portfolioId: 'TEST', valuationDate: '2026-04-24', policies, numPaths: 250, randomSeed: 42 });
if (!Number.isFinite(simulation.meanIrr) || simulation.numPaths !== 250) throw new Error('simulation failed');
const ae = runAeAnalysis({ portfolioId:'TEST', analysisStartDate:'2025-01-01', analysisEndDate:'2025-12-31', methodology:'MORTALITY_DISTRIBUTION', applyIbnr:true, cohorts:[{cohortKey:'2024', actualDeaths:3, expectedDeaths:2.8, exposureDays:1200}] });
if (ae.status !== 'COMPLETED' || !ae.rows.length) throw new Error('ae failed');
console.log(JSON.stringify({ valuationRunId: valuation.valuationRunId, simulationRunId: simulation.valuationRunId, aeRunId: ae.aeAnalysisRunId }, null, 2));
