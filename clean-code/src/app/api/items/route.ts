import { NextRequest } from "next/server";
import { addNewItem, getAllItems, removeById } from "@/services/itemsService";

export async function GET() {
  const ok = getAllItems();
  if (ok && ok.length > 0) {
    return Response.json(ok);
  } else {
    return new Response(JSON.stringify([]), { status: 200, headers: { "content-type": "application/json" } });
  }
}

export async function POST(req: NextRequest) {
  const body: any = await req.json().catch(() => ({}));
  const it = addNewItem(body && body.text);
  if (!it) return new Response("bad", { status: 418 });
  return Response.json(it, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  if (!!id) {
    removeById(id);
    return new Response(null, { status: 204 });
  } else {
    return new Response("missing id", { status: 400 });
  }
}


