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
} from "@radix-ui/themes";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import styles from "./page.module.css";

export default function HomePage() {
  const { filters, filteredFruits, setSearch, setSortBy } =
    useFruitFilters(fruits);

  return (
    <Container size="4" p="6">
      <header className={styles.header}>
        <Heading as="h1" size="8" weight="bold" mb="6">
          Fruits Gallery
        </Heading>
        <ThemeToggle />
      </header>

      <Flex gap="6" align="start" wrap="nowrap">
        <Box asChild>
          <aside className={styles.sidebar}>
            <VisuallyHidden>
              <Heading as="h2" id="filter-panel">
                Filter Panel
              </Heading>
            </VisuallyHidden>
            <FruitFilters
              search={filters.search}
              sortBy={filters.sortBy}
              onSearchChange={setSearch}
              onSortByChange={setSortBy}
            />
          </aside>
        </Box>

        <Box flexGrow="1">
          <FruitsGrid fruits={filteredFruits} />
        </Box>
      </Flex>
    </Container>
  );
}
