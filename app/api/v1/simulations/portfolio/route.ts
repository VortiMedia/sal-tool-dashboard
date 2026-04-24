import { NextRequest, NextResponse } from "next/server";
import type { PolicyValuationInput } from "@/lib/actuarial/types";
import { runPortfolioSimulation } from "@/lib/actuarial/simulation";
import { demoPortfolioInputs } from "@/lib/backend/demo-portfolio";

export async function GET(request: NextRequest) {
  const numPaths = Number(request.nextUrl.searchParams.get("num_paths") ?? 1000);
  const randomSeed = Number(request.nextUrl.searchParams.get("random_seed") ?? 12345);
  return NextResponse.json(runPortfolioSimulation({
    portfolioId: "DEMO-PORTFOLIO-001",
    valuationDate: "2026-04-24",
    policies: demoPortfolioInputs(),
    numPaths: Math.min(Math.max(numPaths, 100), 25000),
    randomSeed
  }));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as { portfolioId?: string; valuationDate?: string; policies?: PolicyValuationInput[]; numPaths?: number; randomSeed?: number } | null;
  return NextResponse.json(runPortfolioSimulation({
    portfolioId: body?.portfolioId ?? "DEMO-PORTFOLIO-001",
    valuationDate: body?.valuationDate ?? "2026-04-24",
    policies: body?.policies?.length ? body.policies : demoPortfolioInputs(),
    numPaths: Math.min(Math.max(body?.numPaths ?? 1000, 100), 25000),
    randomSeed: body?.randomSeed ?? 12345
  }));
}
