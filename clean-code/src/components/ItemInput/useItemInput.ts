import { useCallback, useState } from "react";

export function useItemInput(
  onCreate?: (text: string) => void
) {
  const [value, setValue] = useState<string>("");

  const handleCreate = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate?.(trimmed);
    setValue("");
  }, [value, onCreate]);

  return { value, setValue, handleCreate };
}


