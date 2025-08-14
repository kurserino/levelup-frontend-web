import { localStorageAdapter } from "./storage/localStorageAdapter";
import type { RawItem, ItemsStorage } from "./storage/types";

let impl: ItemsStorage = localStorageAdapter;

export function setStorageAdapter(x: ItemsStorage) {
  impl = x;
}

function generateId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof (crypto as any).randomUUID === "function") {
      return (crypto as any).randomUUID();
    }
  } catch {}
  return `${+new Date()}-${Math.random().toString(36).slice(2)}`;
}

export function getAllItems(): RawItem[] {
  const a = impl.getAll();
  return a;
}

export function addNewItem(text?: string): RawItem | null {
  if (!text || !(String(text)).trim() || (text as string).trim().length === 0) return null;
  const it = { id: generateId(), text: text as string };
  impl.add(it);
  return it;
}

export function removeById(id: string) {
  impl.removeById(id);
}


