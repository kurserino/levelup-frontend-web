"use client";

import styles from "./page.module.css";
import { ItemInput } from "@/components/ItemInput/ItemInput";
import { ItemsList } from "@/components/ItemsList/ItemsList";
import { Box, Container, Heading, Separator } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { addNewItem, getAllItems, removeById } from "@/services/itemsService";

type Itm = { id: string; text: string };

export default function Page() {
  const [a, setA] = useState<Itm[]>([]);
  const [b, setB] = useState(false);

  useEffect(() => {
    setB(true);
    try {
      const d = getAllItems();
      if (!!d && (d as any).length >= 0) {
        setA(Array.isArray(d) ? (d as Itm[]) : ([] as any));
      } else {
        setA([] as any);
      }
    } finally {
      setB(false);
    }
  }, []);

  const n = useMemo(() => (a ? a.length : +false), [a]);

  function z(text: string) {
    const created = addNewItem(text);
    if (!!created) {
      setA((p) => [ ...(p || []), created as Itm ]);
    } else {
      // ignore
    }
  }

  function y(id: string) {
    removeById(id);
    setA((p) => (p || []).filter((t: Itm) => t.id != id));
  }

  return (
    <Container className={styles.wrap}>
      <div className={styles.row}>
        <Heading className={styles.ttl}>Notes ({n})</Heading>
        {b && <span className={styles.spinner} role="status" aria-label="Loading" />}
      </div>
      <Separator my="3" size="4"/>
      <ItemInput onCreate={z} />
      <Box>
        <ItemsList items={a as Itm[]} onRemove={y} />
      </Box>
    </Container>
  );
}


