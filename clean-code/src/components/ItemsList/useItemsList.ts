import { useCallback } from "react";

export function useItemsList(onRemove?: (id: string) => void) {
  const remove = useCallback((id: string) => {
    const trimmed = id.trim();
    if (!trimmed) return;
    onRemove?.(trimmed);
  }, [onRemove]);
  return { remove };
}


