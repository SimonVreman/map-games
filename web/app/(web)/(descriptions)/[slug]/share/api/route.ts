import { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";
import { SharedScore } from "@/components/game/quiz/results/schema";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const body = await request.json();
  const { success, data } = SharedScore.safeParse(body);

  if (!success)
    return Response.json({ error: "Invalid score data" }, { status: 400 });

  const encoded = jwt.sign(data, process.env.SHARING_SECRET!);
  const slug = (await params).slug;

  return Response.json({ url: `/${slug}/share?s=${encoded}` }, { status: 200 });
}
