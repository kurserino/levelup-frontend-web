"use client";
import { useFruitGridNavigation } from "./useFruitGridNavigation";
import { FruitCard } from "../FruitCard/FruitCard";
import { Fruit } from "@/data/fruits";
import { Section, Heading, Grid, Text, VisuallyHidden } from "@radix-ui/themes";

type FruitsGridProps = {
  fruits: Fruit[];
};

export function FruitsGrid({ fruits }: FruitsGridProps) {
  const { gridRef, onKeyDownGrid } = useFruitGridNavigation();

  return (
    <Section aria-labelledby="fruits-gallery" pt="0" pb="0" mt="0" mb="0">
      <Heading as="h2" id="fruits-gallery" size="5" mb="4">
        Fruits Gallery
      </Heading>
      <VisuallyHidden>
        <Text as="p" size="2" color="gray" mb="4">
          Browse through {fruits.length} fruits. Use arrow keys to navigate between cards, and press Enter or Space to view details.
        </Text>
      </VisuallyHidden>
      <div ref={gridRef} onKeyDown={onKeyDownGrid} tabIndex={-1}>
        <Grid
          role="list"
          aria-label={`Fruits gallery with ${fruits.length} items`}
          columns={{ initial: "2", sm: "2", md: "3", lg: "4" }}
          gap="4"
          width="100%"
        >
          {fruits.map((fruit, index) => (
            <FruitCard key={fruit.id} fruit={fruit} index={index} />
          ))}
        </Grid>
      </div>
    </Section>
  );
}
