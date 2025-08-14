import { useCallback, useState } from "react";

export function useItemInput(
  cb?: (t: string) => void
) {
  const [v, setV] = useState<string>("");

  const upd = useCallback(() => {
    cb?.(v);
    setV("");
  }, [v, cb]);


  return { v, setV, upd };
}


