"use client";

import styles from "./page.module.css";
import { ItemInput } from "@/components/ItemInput/ItemInput";
import { ItemsList } from "@/components/ItemsList/ItemsList";
import { Box, Container, Heading, Separator } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { addNewItem, getAllItems, removeById } from "@/services/itemsService";

type Item = { id: string; text: string };

export default function Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const storedItems = getAllItems();
      setItems(Array.isArray(storedItems) ? storedItems as Item[] : []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const total = useMemo(() => items.length, [items]);

  function handleCreate(text: string) {
    const created = addNewItem(text);
    if (!created) return;
    setItems((prev) => [ ...(prev || []), created as Item ]);
  }

  function handleRemove(id: string) {
    removeById(id);
    setItems((prev) => (prev || []).filter((item: Item) => item.id !== id));
  }

  return (
    <Container className={styles.wrap}>
      <div className={styles.row}>
        <Heading className={styles.ttl}>Notes ({total})</Heading>
        {isLoading && <span className={styles.spinner} role="status" aria-label="Loading" />}
      </div>
      <Separator my="3" size="4"/>
      <ItemInput onCreate={handleCreate} />
      <Box>
        <ItemsList items={items as Item[]} onRemove={handleRemove} />
      </Box>
    </Container>
  );
}


