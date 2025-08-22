"use client";
import { Select, TextField, Flex, Box, Text } from "@radix-ui/themes";

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
      aria-label="Filter fruits"
      onSubmit={(e) => e.preventDefault()}
    >
      <Flex direction="column" gap="4">
        <Box>
          <Box as="label" display="block" mb="2">
            <Text size="2" weight="medium">Search</Text>
          </Box>
          <TextField.Root
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="e.g., Apple"
            variant="soft"
          />
        </Box>

        <Box>
          <Box as="label" display="block" mb="2">
            <Text size="2" weight="medium">Sort by</Text>
          </Box>
          <Select.Root
            value={sortBy}
            onValueChange={(v) =>
              onSortByChange(v as FruitFiltersProps["sortBy"])
            }
          >
            <Select.Trigger variant="soft" aria-label="Select sort order" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Name</Select.Label>
                <Select.Item value="name-asc">A → Z</Select.Item>
                <Select.Item value="name-desc">Z → A</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>
      </Flex>
    </form>
  );
}
