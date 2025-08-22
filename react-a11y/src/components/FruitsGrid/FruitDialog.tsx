"use client";
import { Fruit } from "@/data/fruits";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import Image from "next/image";
import styles from "./FruitDialog.module.css";

type FruitDialogProps = {
  fruit: Fruit;
  open: boolean;
  onOpenChange: (_open: boolean) => void;
};

export function FruitDialog({
  fruit,
  open: _open,
  onOpenChange,
}: FruitDialogProps) {
  return (
    <Dialog.Root open={_open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <Dialog.Content
          className={styles.dialogContent}
          aria-labelledby={`dialog-title-${fruit.id}`}
          aria-describedby={`dialog-description-${fruit.id}`}
        >
          {/* Header */}
          <Flex
            justify="between"
            align="center"
            className={styles.dialogHeader}
          >
            <Dialog.Title asChild>
              <Heading
                as="h2"
                size="6"
                weight="bold"
                id={`dialog-title-${fruit.id}`}
              >
                {fruit.name}
              </Heading>
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton
                variant="ghost"
                color="gray"
                size="2"
                aria-label="Close fruit details dialog"
              >
                <Cross2Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>

          {/* Body */}
          <Box className={styles.dialogBody}>
            <Box className={styles.dialogImageContainer}>
              <Image
                src={fruit.image}
                alt={fruit.alt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                className={styles.dialogImage}
              />
            </Box>

            <Dialog.Description asChild>
              <Text
                as="p"
                size="3"
                color="gray"
                className={styles.dialogDescription}
                id={`dialog-description-${fruit.id}`}
              >
                {fruit.description}
              </Text>
            </Dialog.Description>
          </Box>

          {/* Actions */}
          <Flex gap="3" justify="end" className={styles.dialogActions}>
            <Dialog.Close asChild>
              <Button variant="solid" aria-label="Close dialog and return to fruits gallery">
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
