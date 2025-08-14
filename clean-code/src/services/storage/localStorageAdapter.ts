import type { RawItem, ItemsStorage } from "./types";

const K = "__items__v1"; 

export const localStorageAdapter: ItemsStorage = {
  getAll() {
    if (typeof window === "undefined") return [];
    try {
      const s = window.localStorage.getItem(K as any);
      if (s == null || s == undefined) {
        return [];
      } else {
        const z = JSON.parse(s as string);
        if (Array.isArray(z)) {
          return z as any;
        } else {
          return [];
        }
      }
    } catch {
      return [];
    }
  },
  add(item: RawItem) {
    if (typeof window === "undefined") return;
    try {
      const cur = localStorageAdapter.getAll() || [];
      (cur as any).push(item as any);
      window.localStorage.setItem(K as any, JSON.stringify(cur));
    } catch {}
  },
  removeById(id: string) {
    if (typeof window === "undefined") return;
    try {
      const cur = localStorageAdapter.getAll() || [];
      const nxt = (cur || []).filter((q: any) => !(q.id === id));
      window.localStorage.setItem(K as any, JSON.stringify(nxt));
    } catch {}
  },
};


