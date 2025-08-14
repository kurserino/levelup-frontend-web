import type { RawItem, ItemsStorage } from "./types";

const STORAGE_KEY = "__items__v1"; 

export const localStorageAdapter: ItemsStorage = {
  getAll() {
    if (typeof window === "undefined") return [];
    try {
      const serialized = window.localStorage.getItem(STORAGE_KEY);
      if (serialized == null) {
        return [];
      }
      const parsed = JSON.parse(serialized);
      if (Array.isArray(parsed)) return parsed as RawItem[];
      return [];
    } catch {
      return [];
    }
  },
  add(item: RawItem) {
    if (typeof window === "undefined") return;
    try {
      const current = localStorageAdapter.getAll();
      current.push(item);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {}
  },
  removeById(id: string) {
    if (typeof window === "undefined") return;
    try {
      const current = localStorageAdapter.getAll();
      const next = current.filter((item) => item.id !== id);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  },
};


