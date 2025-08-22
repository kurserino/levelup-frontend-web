"use client";
import { useFruitFilters } from "@/components/FruitFilters/useFruitFilters";
import { FruitFilters } from "@/components/FruitFilters/FruitFilters";
import { FruitsGrid } from "@/components/FruitsGrid";
import { fruits } from "@/data/fruits";
import {
  Container,
  Heading,
  VisuallyHidden,
  Flex,
  Box,
  Text,
} from "@radix-ui/themes";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import styles from "./page.module.css";

export default function HomePage() {
  const { filters, filteredFruits, setSearch, setSortBy } =
    useFruitFilters(fruits);

  return (
    <Container size="4" p="6" aria-label="Fruits Gallery">
      <header className={styles.header} role="banner">
        <Heading as="h1" size="8" weight="bold" mb="6">
          Fruits Gallery
        </Heading>
        <ThemeToggle />
      </header>

      <main role="main" aria-label="Fruits Gallery Content">
        <Flex
          gap={{ initial: "6", lg: "4" }}
          align={{ initial: "stretch", lg: "start" }}
          wrap="nowrap"
          direction={{ initial: "column", lg: "row" }}
        >
          <Box asChild>
            <aside
              className={styles.sidebar}
              role="complementary"
              aria-labelledby="filter-panel"
            >
              <Heading as="h2" id="filter-panel" size="4" mb="4">
                Filter Panel
              </Heading>
              <VisuallyHidden>
                <Text as="p" size="2" color="gray" mb="4">
                  Use these controls to search and sort the fruits in the gallery.
                </Text>
              </VisuallyHidden>
              <FruitFilters
                search={filters.search}
                sortBy={filters.sortBy}
                onSearchChange={setSearch}
                onSortByChange={setSortBy}
              />
            </aside>
          </Box>

          <Box flexGrow="1" role="region" aria-labelledby="fruits-gallery">
            <FruitsGrid fruits={filteredFruits} />
          </Box>
        </Flex>
      </main>
    </Container>
  );
}
