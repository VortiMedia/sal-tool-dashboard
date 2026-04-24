export type Recommendation = "BUY" | "REVIEW" | "PASS";
export type UwRecommendation = "Favorable" | "Neutral" | "Unfavorable";

export type Policy = {
  id: string;
  carrier: string;
  insured: string;
  age: number;
  faceValue: number;
  purchasePrice: number;
  annualPremium: number;
  score: number;
  irr: number;
  adjustedIrr: number;
  moic: number;
  payback: number;
  le: number;
  adjustedLe: number;
  leDeviation: number;
  recommendation: Recommendation;
  risk: "Low" | "Medium" | "High";
  premiumFunding: "Adequate" | "At Risk" | "Unknown";
  nlg: "Protected" | "Partial" | "Missing";
  contestability: "Expired" | "Active" | "Unknown";
  suicideClause: "Expired" | "Active" | "Unknown";
  confidence: "High" | "Medium" | "Low";
  underwriting: UwRecommendation;
  mortalityDrivers: string[];
  sourceAvailability: number;
  dataQuality: number;
};

export const policies: Policy[] = [
  { id: "POL-001", carrier: "Atlas Life", insured: "JD-01", age: 78, faceValue: 2500000, purchasePrice: 610000, annualPremium: 58000, score: 91, irr: 21.4, adjustedIrr: 24.1, moic: 3.2, payback: 4.7, le: 6.8, adjustedLe: 5.9, leDeviation: -0.9, recommendation: "BUY", risk: "Low", premiumFunding: "Adequate", nlg: "Protected", contestability: "Expired", suicideClause: "Expired", confidence: "High", underwriting: "Favorable", mortalityDrivers: ["Cardiac history", "Renal markers", "Low mobility"], sourceAvailability: 94, dataQuality: 90 },
  { id: "POL-002", carrier: "Northstar Mutual", insured: "MS-02", age: 73, faceValue: 1800000, purchasePrice: 450000, annualPremium: 42000, score: 84, irr: 18.9, adjustedIrr: 19.8, moic: 2.7, payback: 5.3, le: 7.2, adjustedLe: 6.9, leDeviation: -0.3, recommendation: "BUY", risk: "Low", premiumFunding: "Adequate", nlg: "Protected", contestability: "Expired", suicideClause: "Expired", confidence: "High", underwriting: "Favorable", mortalityDrivers: ["Diabetes", "COPD mild"], sourceAvailability: 86, dataQuality: 82 },
  { id: "POL-003", carrier: "Crescent Life", insured: "RB-03", age: 81, faceValue: 3200000, purchasePrice: 980000, annualPremium: 76000, score: 77, irr: 16.6, adjustedIrr: 14.9, moic: 2.4, payback: 6.2, le: 6.1, adjustedLe: 6.8, leDeviation: 0.7, recommendation: "REVIEW", risk: "Medium", premiumFunding: "Adequate", nlg: "Partial", contestability: "Expired", suicideClause: "Expired", confidence: "Medium", underwriting: "Neutral", mortalityDrivers: ["Cancer history", "Stable labs"], sourceAvailability: 78, dataQuality: 74 },
  { id: "POL-004", carrier: "Harbor National", insured: "LT-04", age: 76, faceValue: 1250000, purchasePrice: 365000, annualPremium: 39000, score: 68, irr: 13.7, adjustedIrr: 11.2, moic: 2.0, payback: 7.1, le: 7.4, adjustedLe: 8.6, leDeviation: 1.2, recommendation: "REVIEW", risk: "Medium", premiumFunding: "At Risk", nlg: "Partial", contestability: "Unknown", suicideClause: "Expired", confidence: "Medium", underwriting: "Neutral", mortalityDrivers: ["Sparse records", "Hypertension"], sourceAvailability: 63, dataQuality: 66 },
  { id: "POL-005", carrier: "Monarch Life", insured: "AK-05", age: 84, faceValue: 4100000, purchasePrice: 1160000, annualPremium: 88000, score: 88, irr: 20.2, adjustedIrr: 22.0, moic: 3.0, payback: 5.0, le: 5.8, adjustedLe: 5.1, leDeviation: -0.7, recommendation: "BUY", risk: "Low", premiumFunding: "Adequate", nlg: "Protected", contestability: "Expired", suicideClause: "Expired", confidence: "High", underwriting: "Favorable", mortalityDrivers: ["Advanced age", "CHF", "Medication burden"], sourceAvailability: 91, dataQuality: 88 },
  { id: "POL-006", carrier: "Penn River", insured: "CW-06", age: 69, faceValue: 950000, purchasePrice: 310000, annualPremium: 33000, score: 54, irr: 9.8, adjustedIrr: 7.4, moic: 1.5, payback: 9.4, le: 8.3, adjustedLe: 10.1, leDeviation: 1.8, recommendation: "PASS", risk: "High", premiumFunding: "At Risk", nlg: "Missing", contestability: "Active", suicideClause: "Expired", confidence: "Low", underwriting: "Unfavorable", mortalityDrivers: ["Younger insured", "Limited impairments"], sourceAvailability: 58, dataQuality: 52 },
  { id: "POL-007", carrier: "Sentinel Life", insured: "VN-07", age: 80, faceValue: 2200000, purchasePrice: 540000, annualPremium: 61000, score: 79, irr: 17.6, adjustedIrr: 18.4, moic: 2.6, payback: 5.8, le: 6.9, adjustedLe: 6.4, leDeviation: -0.5, recommendation: "BUY", risk: "Medium", premiumFunding: "Adequate", nlg: "Protected", contestability: "Expired", suicideClause: "Expired", confidence: "Medium", underwriting: "Favorable", mortalityDrivers: ["Stroke history", "Mobility limits"], sourceAvailability: 82, dataQuality: 79 },
  { id: "POL-008", carrier: "Summit Assurance", insured: "EP-08", age: 75, faceValue: 1700000, purchasePrice: 505000, annualPremium: 47000, score: 61, irr: 12.1, adjustedIrr: 10.8, moic: 1.8, payback: 8.2, le: 7.8, adjustedLe: 8.5, leDeviation: 0.7, recommendation: "PASS", risk: "High", premiumFunding: "Unknown", nlg: "Partial", contestability: "Unknown", suicideClause: "Unknown", confidence: "Low", underwriting: "Unfavorable", mortalityDrivers: ["Incomplete APS", "No recent labs"], sourceAvailability: 42, dataQuality: 48 },
  { id: "POL-009", carrier: "Keystone Life", insured: "GH-09", age: 82, faceValue: 2900000, purchasePrice: 820000, annualPremium: 72000, score: 82, irr: 18.2, adjustedIrr: 17.6, moic: 2.5, payback: 5.9, le: 6.2, adjustedLe: 6.5, leDeviation: 0.3, recommendation: "BUY", risk: "Low", premiumFunding: "Adequate", nlg: "Protected", contestability: "Expired", suicideClause: "Expired", confidence: "High", underwriting: "Neutral", mortalityDrivers: ["Cancer remission", "Cardiac stable"], sourceAvailability: 88, dataQuality: 84 },
  { id: "POL-010", carrier: "Evergreen Life", insured: "PX-10", age: 79, faceValue: 2000000, purchasePrice: 475000, annualPremium: 53000, score: 86, irr: 19.5, adjustedIrr: 21.1, moic: 2.9, payback: 5.1, le: 6.7, adjustedLe: 5.8, leDeviation: -0.9, recommendation: "BUY", risk: "Low", premiumFunding: "Adequate", nlg: "Protected", contestability: "Expired", suicideClause: "Expired", confidence: "High", underwriting: "Favorable", mortalityDrivers: ["COPD", "Frailty", "Weight loss"], sourceAvailability: 90, dataQuality: 87 }
];

export const uploads = [
  { file: "policy_packet_POL-010.pdf", type: "Policy Documents", status: "Score", progress: 82, anonymized: "Yes", issues: 0 },
  { file: "medical_records_INS-008.pdf", type: "Medical Records", status: "Validate", progress: 64, anonymized: "Yes", issues: 3 },
  { file: "actuary_le_batch_04.xlsx", type: "LE Reports", status: "Complete", progress: 100, anonymized: "N/A", issues: 0 },
  { file: "premium_schedule_POL-004.csv", type: "Policy Documents", status: "Extract", progress: 41, anonymized: "Yes", issues: 1 }
];

export const fmtMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: value >= 1000000 ? "compact" : "standard", maximumFractionDigits: value >= 1000000 ? 1 : 0 }).format(value);

export const avg = (nums: number[]) => nums.reduce((sum, n) => sum + n, 0) / nums.length;
export const countBy = <T extends string>(items: T[]) => items.reduce<Record<T, number>>((acc, item) => ({ ...acc, [item]: (acc[item] ?? 0) + 1 }), {} as Record<T, number>);

export const summary = {
  policies: policies.length,
  avgScore: Math.round(avg(policies.map((p) => p.score))),
  avgIrr: avg(policies.map((p) => p.irr)),
  avgAdjustedIrr: avg(policies.map((p) => p.adjustedIrr)),
  avgAdjustedLe: avg(policies.map((p) => p.adjustedLe)),
  avgLeDeviation: avg(policies.map((p) => p.leDeviation)),
  favorableUw: policies.filter((p) => p.underwriting === "Favorable").length,
  capital: policies.reduce((sum, p) => sum + p.purchasePrice, 0),
  premiums: policies.reduce((sum, p) => sum + p.annualPremium, 0),
  face: policies.reduce((sum, p) => sum + p.faceValue, 0)
};

export const simulationSummary = {
  meanIrr: 13.8,
  medianIrr: 14.1,
  cte5: -3.5,
  negativeIrr: 7.0,
  liquidityShortfall: 11.4,
  percentiles: [
    { label: "p01", value: -8.2, width: 14 },
    { label: "p05", value: -3.5, width: 24 },
    { label: "p10", value: 2.4, width: 34 },
    { label: "p25", value: 8.9, width: 49 },
    { label: "p50", value: 14.1, width: 63 },
    { label: "p75", value: 18.7, width: 78 },
    { label: "p90", value: 23.8, width: 90 },
    { label: "p99", value: 31.4, width: 100 }
  ]
};

export const aeRows = [
  { cohort: "2022 vintage", duration1: "2", duration2: "3", duration3: "1", ae: "118%" },
  { cohort: "2023 vintage", duration1: "1", duration2: "2", duration3: "—", ae: "104%" },
  { cohort: "2024 vintage", duration1: "3", duration2: "—", duration3: "—", ae: "127%" },
  { cohort: "High multiplier", duration1: "4", duration2: "2", duration3: "1", ae: "132%" },
  { cohort: "Low multiplier", duration1: "1", duration2: "1", duration3: "0", ae: "82%" }
];
