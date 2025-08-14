"use client";
import { useFruitGridNavigation } from "./useFruitGridNavigation";
import { FruitCard } from "../FruitCard/FruitCard";
import { Fruit } from "@/data/fruits";
import { Section, Heading, Grid, VisuallyHidden } from "@radix-ui/themes";

type FruitsGridProps = {
  fruits: Fruit[];
};

export function FruitsGrid({ fruits }: FruitsGridProps) {
  const { gridRef, onKeyDownGrid } = useFruitGridNavigation();

  return (
    <Section aria-labelledby="fruits-gallery">
      <VisuallyHidden>
        <Heading as="h2" id="fruits-gallery">
          Fruits list
        </Heading>
      </VisuallyHidden>
      <Grid
        role="list"
        aria-label="Fruits"
        columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
        gap="4"
        width="100%"
        ref={gridRef}
        onKeyDown={onKeyDownGrid}
      >
        {fruits.map((fruit, index) => (
          <FruitCard key={fruit.id} fruit={fruit} index={index} />
        ))}
      </Grid>
    </Section>
  );
}
