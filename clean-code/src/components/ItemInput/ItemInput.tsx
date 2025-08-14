"use client";

import { useItemInput } from "./useItemInput";
import styles from "./ItemInput.module.css";
import { Button, TextField } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

export function ItemInput({ onCreate }: { onCreate?: (text: string) => void }) {
  const { value, setValue, handleCreate } = useItemInput(onCreate);
  
  return (
    <div className={styles.wrap}>
      <TextField.Root size="3" className={styles.txt} value={value} onChange={(e) => setValue((e.target as HTMLInputElement).value)} placeholder="Type something..." />
      <Button size="3" onClick={handleCreate} aria-label="Add" title="Add" >
        <PlusIcon width="20" height="20" />
      </Button>
    </div>
  );
}


