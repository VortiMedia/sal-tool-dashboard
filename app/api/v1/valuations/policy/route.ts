import { NextRequest, NextResponse } from "next/server";
import type { PolicyValuationInput } from "@/lib/actuarial/types";
import { valuePolicy } from "@/lib/actuarial/valuation";
import { demoPolicyInput } from "@/lib/backend/demo-portfolio";

export async function GET(request: NextRequest) {
  const policyId = request.nextUrl.searchParams.get("policy_id") ?? "POL-001";
  return NextResponse.json(valuePolicy(demoPolicyInput(policyId)));
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as Partial<PolicyValuationInput> | null;
  const input = body?.policyId ? body as PolicyValuationInput : demoPolicyInput();
  return NextResponse.json(valuePolicy(input));
}
