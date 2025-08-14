export type RawItem = { id: string; text: string };

export interface ItemsStorage {
  getAll(): RawItem[];
  add(item: RawItem): void;
  removeById(id: string): void;
}


