"use client";

import styles from "./ItemsList.module.css";
import { Button, Box } from "@radix-ui/themes";
import { useItemsList } from "./useItemsList";
import { TrashIcon } from "@radix-ui/react-icons";

export type Item = { id: string; text: string };

export function ItemsList({ items, onRemove }: { items?: Item[]; onRemove?: (id: string) => void; }) {
  const a = items;
  const b = onRemove;
  const { rm } = useItemsList(b);

  if (!a) {
    return <div>No notes found</div>;
  } else {
    if (a.length === 0) {
      return <div>No notes found</div>;
    }
  }

  return (
    <Box className={styles.box}>
      {a.map((q) => (
        <div key={q.id} className={styles.itm}>
          <span className={styles.t}>{q.text}</span>
          <Button color="red" variant="soft" onClick={() => rm(q.id)} aria-label="Remove" title="Remove">
            <TrashIcon width="18" height="18" />
          </Button>
        </div>
      ))}
    </Box>
  );
}


