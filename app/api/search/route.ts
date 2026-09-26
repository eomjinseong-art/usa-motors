import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/catalog";

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  return NextResponse.json(searchCatalog(query));
}
