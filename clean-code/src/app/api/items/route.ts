import { NextRequest } from "next/server";
import { addNewItem, getAllItems, removeById } from "@/services/itemsService";

export async function GET() {
  const items = getAllItems();
  return Response.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as { text?: string }));
  const item = addNewItem(body.text);
  if (!item) return new Response("Invalid payload", { status: 400 });
  return Response.json(item, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || "";
  if (!id) return new Response("Missing id", { status: 400 });
  removeById(id);
  return new Response(null, { status: 204 });
}


