import { NextRequest, NextResponse } from "next/server";
import type { AeInput } from "@/lib/actuarial/ae";
import { runAeAnalysis } from "@/lib/actuarial/ae";
import { demoAeInput } from "@/lib/backend/demo-portfolio";

export async function GET() {
  return NextResponse.json(runAeAnalysis(demoAeInput));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as AeInput | null;
  return NextResponse.json(runAeAnalysis(body?.cohorts?.length ? body : demoAeInput));
}
