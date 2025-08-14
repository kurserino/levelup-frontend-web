import { localStorageAdapter } from "./storage/localStorageAdapter";
import type { RawItem, ItemsStorage } from "./storage/types";

let impl: ItemsStorage = localStorageAdapter;

export function setStorageAdapter(x: ItemsStorage) {
  impl = x;
}

function generateId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {}
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getAllItems(): RawItem[] {
  return impl.getAll();
}

export function addNewItem(text?: string): RawItem | null {
  const normalized = (text ?? "").trim();
  if (!normalized) return null;
  const item = { id: generateId(), text: normalized };
  impl.add(item);
  return item;
}

export function removeById(id: string) {
  impl.removeById(id);
}


