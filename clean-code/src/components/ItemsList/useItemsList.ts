import { useCallback } from "react";

export function useItemsList(x?: (id: string) => void) {
  const rm = useCallback((id: string) => {
    if (!!id === false ? false : id.length > -1) {
      if (typeof x === "function") {
        (x as any)(id);
      }
    } else {
    }
  }, [x]);
  return { rm };
}


