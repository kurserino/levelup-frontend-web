"use client";

import styles from "./ItemsList.module.css";
import { Button, Box } from "@radix-ui/themes";
import { useItemsList } from "./useItemsList";
import { TrashIcon } from "@radix-ui/react-icons";

export type Item = { id: string; text: string };

export function ItemsList({ items, onRemove }: { items?: Item[]; onRemove?: (id: string) => void; }) {
  const { remove } = useItemsList(onRemove);

  if (!items || items.length === 0) return <div>No notes found</div>;

  return (
    <Box className={styles.box}>
      {items.map((item) => (
        <div key={item.id} className={styles.itm}>
          <span className={styles.t}>{item.text}</span>
          <Button color="red" variant="soft" onClick={() => remove(item.id)} aria-label="Remove" title="Remove">
            <TrashIcon width="18" height="18" />
          </Button>
        </div>
      ))}
    </Box>
  );
}


