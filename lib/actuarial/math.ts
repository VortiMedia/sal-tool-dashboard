import { createHash } from "crypto";
export const round = (value: number, decimals = 2) => Math.round((value + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
export const yearsBetween = (startIso: string, endIso: string) => (new Date(endIso).getTime() - new Date(startIso).getTime()) / (365.25 * 24 * 60 * 60 * 1000);
export function addMonths(iso: string, months: number) { const date = new Date(`${iso}T00:00:00.000Z`); date.setUTCMonth(date.getUTCMonth() + months); return date.toISOString().slice(0, 10); }
export const stableHash = (input: unknown) => createHash("sha256").update(JSON.stringify(input)).digest("hex").slice(0, 16);
export const npv = (ratePerPeriod: number, cashFlows: number[]) => cashFlows.reduce((sum, cf, index) => sum + cf / (1 + ratePerPeriod) ** index, 0);
export function solveIrr(cashFlows: number[]) { if (!cashFlows.some(v=>v>0) || !cashFlows.some(v=>v<0)) return null; let low=-0.9999, high=10, lowVal=npv(low,cashFlows), highVal=npv(high,cashFlows); for(let i=0;i<12 && Math.sign(lowVal)===Math.sign(highVal);i++){ high*=2; highVal=npv(high,cashFlows); } if(Math.sign(lowVal)===Math.sign(highVal)) return null; for(let i=0;i<120;i++){ const mid=(low+high)/2, midVal=npv(mid,cashFlows); if(Math.abs(midVal)<1e-7) return mid; if(Math.sign(midVal)===Math.sign(lowVal)){ low=mid; lowVal=midVal; } else high=mid; } return (low+high)/2; }
export function percentile(sortedValues: number[], p: number) { if(!sortedValues.length) return 0; const index=(sortedValues.length-1)*p, low=Math.floor(index), high=Math.ceil(index); return low===high ? sortedValues[low] : sortedValues[low]+(sortedValues[high]-sortedValues[low])*(index-low); }
export const mean = (values: number[]) => values.length ? values.reduce((s,v)=>s+v,0)/values.length : 0;
export function stddev(values: number[]) { const m=mean(values); return Math.sqrt(mean(values.map(v=>(v-m)**2))); }
export function makePrng(seed: number) { let state=seed>>>0; return () => { state=(1664525*state+1013904223)>>>0; return state/2**32; }; }
