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
          <Text as="label" size="2" weight="medium" mb="2">
            Search
          </Text>
          <TextField.Root
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="e.g., Apple"
            variant="soft"
          />
        </Box>

        <Box>
          <Text as="label" size="2" weight="medium" mb="2">
            Sort by
          </Text>
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
