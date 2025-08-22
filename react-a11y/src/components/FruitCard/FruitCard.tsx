"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, Text, Box, Inset, Strong, VisuallyHidden } from "@radix-ui/themes";
import { Fruit } from "@/data/fruits";
import { FruitDialog } from "../FruitsGrid/FruitDialog";
import styles from "./FruitCard.module.css";

type FruitCardProps = {
  fruit: Fruit;
  index?: number;
};

export function FruitCard({ fruit, index }: FruitCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsDialogOpen(true);
    }
  };

  const cardPosition = index !== undefined ? `${index + 1}` : '';
  const ariaLabel = `View details of ${fruit.name}.`;

  return (
    <div role="listitem" className={styles.cardContainer}>
      <Card
        size="3"
        variant="surface"
        className={styles.fruitCard}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={ariaLabel}
        aria-describedby={`fruit-description-${fruit.id}`}
      >
        <Inset clip="padding-box" side="top">
          <Image
            src={fruit.image}
            alt={fruit.alt}
            className={styles.fruitImage}
            width={280}
            height={240}
          />
        </Inset>

        <Box className={styles.cardContent}>
          <Text as="p" size="3" weight="bold" mb="2">
            <Strong id={`fruit-name-${fruit.id}`}>{fruit.name}</Strong>
          </Text>
          <Text
            as="p"
            size="2"
            color="gray"
            id={`fruit-description-${fruit.id}`}
            className={styles.fruitDescription}
          >
            {fruit.description}
          </Text>
          <VisuallyHidden>
            <Text as="p" size="1" color="gray" mt="2">
              Click or press Enter to view more details
            </Text>
          </VisuallyHidden>
        </Box>
      </Card>

      <FruitDialog
        fruit={fruit}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
