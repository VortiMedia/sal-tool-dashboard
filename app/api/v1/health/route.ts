import { NextResponse } from "next/server";
import { ENGINE_VERSION } from "@/lib/actuarial/valuation";

export function GET() {
  return NextResponse.json({
    status: "ok",
    engineVersion: ENGINE_VERSION,
    piiPolicy: "demo-safe: no real PII, no persistent sensitive storage",
    endpoints: [
      "/api/v1/valuations/policy",
      "/api/v1/simulations/portfolio",
      "/api/v1/ae-analysis"
    ]
  });
}
