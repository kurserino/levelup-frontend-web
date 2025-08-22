"use client";
import { Select, TextField, Flex, Box, Text, VisuallyHidden } from "@radix-ui/themes";

type FruitFiltersProps = {
  search: string;
  sortBy: "name-asc" | "name-desc";
  onSearchChange: (_value: string) => void;
  onSortByChange: (_value: "name-asc" | "name-desc") => void;
};

export function FruitFilters({
  search,
  sortBy,
  onSearchChange,
  onSortByChange,
}: FruitFiltersProps) {
  return (
    <form
      role="search"
      aria-label="Filter and sort fruits in the gallery"
      onSubmit={(e) => e.preventDefault()}
    >
      <Flex direction="column" gap="4">
        <Box>
          <label htmlFor="fruit-search" style={{ display: 'block', marginBottom: '8px' }}>
            <Text size="2" weight="medium">Search fruits</Text>
          </label>
          <TextField.Root
            id="fruit-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type to search fruits, e.g., Apple"
            variant="soft"
            aria-describedby="search-help"
          />
          <VisuallyHidden>
            <Text id="search-help" size="1" color="gray" mt="1">
              Search fruits by name or description
            </Text>
          </VisuallyHidden>
        </Box>

        <Box>
          <label htmlFor="fruit-sort" style={{ display: 'block', marginBottom: '8px' }}>
            <Text size="2" weight="medium">Sort fruits by name</Text>
          </label>
          <Select.Root
            value={sortBy}
            onValueChange={(v) =>
              onSortByChange(v as FruitFiltersProps["sortBy"])
            }
          >
            <Select.Trigger
              id="fruit-sort"
              variant="soft"
              aria-label="Select sort order for fruits"
            />
            <Select.Content>
              <Select.Group>
                <Select.Label>Sort by name</Select.Label>
                <Select.Item value="name-asc">A to Z</Select.Item>
                <Select.Item value="name-desc">Z to A</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>
      </Flex>
    </form>
  );
}
